// app/admin/dashboard/contact/page.tsx (Enhanced version)
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Check, X } from "lucide-react";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import { ContactInfo } from "@/types/contact";

const initialContactData: ContactInfo = {
  email: "info@cwwhitelaw.com",
  phone: "713-236-7700",
  address: "Lyric Tower 440 Louisiana St, STE 900, Houston TX 77002",
  socialMedia: {
    facebook: "www.facebook.com",
    twitter: "www.twitter.com",
    linkedin: "www.linkedin.com",
  },
};

export default function ContactPage() {
  const [contactInfo, setContactInfo] =
    useState<ContactInfo>(initialContactData);
  const [originalData, setOriginalData] =
    useState<ContactInfo>(initialContactData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    if (!contactInfo.address) {
      newErrors.address = "Office address is required";
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
    setContactInfo(originalData);
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Contact info saved:", contactInfo);
      setOriginalData(contactInfo);
      setIsEditing(false);
      setErrors({});

      // Show success message (if using toast)
      // toast({ title: "Success", description: "Contact information updated successfully" });
    } catch (error) {
      console.error("Error saving contact info:", error);
      // Show error message
      // toast({ title: "Error", description: "Failed to update contact information", variant: "destructive" });
    } finally {
      setIsLoading(false);
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
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-base font-semibold text-gray-900"
            >
              Office Address
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={contactInfo.address}
              onChange={(e) => handleChange(e, "address")}
              disabled={!isEditing}
              className={`w-full text-base ${
                errors.address ? "border-red-500" : ""
              }`}
              placeholder="Lyric Tower 440 Louisiana St, STE 900, Houston TX 77002"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
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
