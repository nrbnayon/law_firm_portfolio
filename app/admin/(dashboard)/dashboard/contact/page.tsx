// app/admin/dashboard/contact/page.tsx (Enhanced version)
"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import { ContactInfo } from "@/types/contact";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchContactInfo,
  updateContactInfo,
  clearError,
} from "@/redux/features/contact/contactSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const {
    contactInfo: reduxContactInfo,
    isLoading,
    error,
  } = useAppSelector((state) => state.contact);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
      line3: "",
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
  });
  const [originalData, setOriginalData] = useState<ContactInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch contact info on mount
  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  // Update local state when Redux state changes
  useEffect(() => {
    if (reduxContactInfo) {
      setContactInfo(reduxContactInfo);
      setOriginalData(reduxContactInfo);
    }
  }, [reduxContactInfo]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error, {
        description: "Please try again later.",
        duration: 3000,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const validateURL = (url: string): boolean => {
    if (!url) return true; // Optional field
    const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/;
    return urlRegex.test(url);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!contactInfo.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(contactInfo.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!contactInfo.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(contactInfo.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!contactInfo.address.line1) {
      newErrors.addressLine1 = "Address line 1 is required";
    }

    if (!contactInfo.address.line2) {
      newErrors.addressLine2 = "Address line 2 is required";
    }

    if (!contactInfo.address.line3) {
      newErrors.addressLine3 = "Address line 3 is required";
    }

    if (
      contactInfo.socialMedia.facebook &&
      !validateURL(contactInfo.socialMedia.facebook)
    ) {
      newErrors.facebook = "Invalid URL format";
    }

    if (
      contactInfo.socialMedia.twitter &&
      !validateURL(contactInfo.socialMedia.twitter)
    ) {
      newErrors.twitter = "Invalid URL format";
    }

    if (
      contactInfo.socialMedia.linkedin &&
      !validateURL(contactInfo.socialMedia.linkedin)
    ) {
      newErrors.linkedin = "Invalid URL format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ContactInfo | string
  ) => {
    const { value } = e.target;

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (field.startsWith("socialMedia.")) {
      const socialField = field.split(
        "."
      )[1] as keyof ContactInfo["socialMedia"];
      setContactInfo((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value,
        },
      }));
    } else if (field.startsWith("address.")) {
      const addressField = field.split(".")[1] as keyof ContactInfo["address"];
      setContactInfo((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setContactInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleEdit = () => {
    setOriginalData(contactInfo);
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    if (originalData) {
      setContactInfo(originalData);
    }
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(updateContactInfo(contactInfo)).unwrap();

      toast.success("Contact information updated successfully", {
        description: "The contact information has been saved.",
        duration: 3000,
      });

      setOriginalData(contactInfo);
      setIsEditing(false);
      setErrors({});
    } catch (err: any) {
      toast.error(err || "Failed to update contact information", {
        description: "Please try again.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      {/* Contact Information Form */}
      <div className="rounded-lg bg-white shadow-sm p-6 md:p-8 w-full">
        <div className="space-y-8">
          {/* Email and Phone Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Address */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-base font-semibold text-gray-900"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleChange(e, "email")}
                disabled={!isEditing}
                className={`w-full text-base ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="info@cwwhitelaw.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-base font-semibold text-gray-900"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleChange(e, "phone")}
                disabled={!isEditing}
                className={`w-full text-base ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="713-236-7700"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Office Address Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
              Office Address
            </h3>

            {/* Address Line 1 */}
            <div className="space-y-2">
              <Label
                htmlFor="addressLine1"
                className="text-base font-normal text-gray-600"
              >
                Address Line 1
              </Label>
              <Input
                id="addressLine1"
                name="addressLine1"
                type="text"
                value={contactInfo.address.line1}
                onChange={(e) => handleChange(e, "address.line1")}
                disabled={!isEditing}
                className={`w-full text-base ${
                  errors.addressLine1 ? "border-red-500" : ""
                }`}
                placeholder="Lyric Tower"
              />
              {errors.addressLine1 && (
                <p className="text-sm text-red-500">{errors.addressLine1}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="space-y-2">
              <Label
                htmlFor="addressLine2"
                className="text-base font-normal text-gray-600"
              >
                Address Line 2
              </Label>
              <Input
                id="addressLine2"
                name="addressLine2"
                type="text"
                value={contactInfo.address.line2}
                onChange={(e) => handleChange(e, "address.line2")}
                disabled={!isEditing}
                className={`w-full text-base ${
                  errors.addressLine2 ? "border-red-500" : ""
                }`}
                placeholder="440 Louisiana St., STE 900"
              />
              {errors.addressLine2 && (
                <p className="text-sm text-red-500">{errors.addressLine2}</p>
              )}
            </div>

            {/* Address Line 3 */}
            <div className="space-y-2">
              <Label
                htmlFor="addressLine3"
                className="text-base font-normal text-gray-600"
              >
                Address Line 3
              </Label>
              <Input
                id="addressLine3"
                name="addressLine3"
                type="text"
                value={contactInfo.address.line3}
                onChange={(e) => handleChange(e, "address.line3")}
                disabled={!isEditing}
                className={`w-full text-base ${
                  errors.addressLine3 ? "border-red-500" : ""
                }`}
                placeholder="Houston, TX 77002"
              />
              {errors.addressLine3 && (
                <p className="text-sm text-red-500">{errors.addressLine3}</p>
              )}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
              Social Media
            </h3>

            <div className="space-y-4">
              {/* Facebook */}
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <Label
                  htmlFor="facebook"
                  className="text-base font-normal text-gray-600 pt-2"
                >
                  Facebook
                </Label>
                <div className="space-y-1">
                  <Input
                    id="facebook"
                    name="facebook"
                    type="url"
                    value={contactInfo.socialMedia.facebook}
                    onChange={(e) => handleChange(e, "socialMedia.facebook")}
                    disabled={!isEditing}
                    className={`w-full text-base ${
                      errors.facebook ? "border-red-500" : ""
                    }`}
                    placeholder="www.facebook.com"
                  />
                  {errors.facebook && (
                    <p className="text-sm text-red-500">{errors.facebook}</p>
                  )}
                </div>
              </div>

              {/* Twitter */}
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <Label
                  htmlFor="twitter"
                  className="text-base font-normal text-gray-600 pt-2"
                >
                  Twitter
                </Label>
                <div className="space-y-1">
                  <Input
                    id="twitter"
                    name="twitter"
                    type="url"
                    value={contactInfo.socialMedia.twitter}
                    onChange={(e) => handleChange(e, "socialMedia.twitter")}
                    disabled={!isEditing}
                    className={`w-full text-base ${
                      errors.twitter ? "border-red-500" : ""
                    }`}
                    placeholder="www.twitter.com"
                  />
                  {errors.twitter && (
                    <p className="text-sm text-red-500">{errors.twitter}</p>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <Label
                  htmlFor="linkedin"
                  className="text-base font-normal text-gray-600 pt-2"
                >
                  Linkedin
                </Label>
                <div className="space-y-1">
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    value={contactInfo.socialMedia.linkedin}
                    onChange={(e) => handleChange(e, "socialMedia.linkedin")}
                    disabled={!isEditing}
                    className={`w-full text-base ${
                      errors.linkedin ? "border-red-500" : ""
                    }`}
                    placeholder="www.linkedin.com"
                  />
                  {errors.linkedin && (
                    <p className="text-sm text-red-500">{errors.linkedin}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-primary-gold hover:bg-primary-gold/90 text-white text-base rounded-md px-6 flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-6 text-base rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-6 bg-primary-gold rounded-md hover:bg-primary-gold/90 text-white text-base"
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
