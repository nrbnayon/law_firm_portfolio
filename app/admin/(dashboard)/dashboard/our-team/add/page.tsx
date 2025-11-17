"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import ImageUpload from "@/components/Admin/ImageUpload";
import DynamicInputList from "@/components/Admin/DynamicInputList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createAttorney,
} from "@/redux/features/attorneys/attorneysSlice";
import type { AttorneyFormData } from "@/types/attorney";

const initialData: AttorneyFormData = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  location: {
    line1: "",
    line2: "",
    line3: "",
  },
  biography: "",
  profileImage: "",
  bannerImage: "",
  education: [],
  barAdmission: [],
  professionalMemberships: [],
  socialLinks: {
    facebook: "",
    twitter: "",
    linkedin: "",
  },
};

export default function AddTeamMemberPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.attorneys);

  const [formData, setFormData] = useState<AttorneyFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.designation?.trim()) {
      newErrors.designation = "Role is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.location.line1.trim()) {
      newErrors.line1 = "Location Line 1 is required";
    }

    if (!formData.location.line2?.trim()) {
      newErrors.line2 = "Location Line 2 is required";
    }

    if (!formData.location.line3?.trim()) {
      newErrors.line3 = "Location Line 3 is required";
    }

    if (!formData.biography.trim()) {
      newErrors.biography = "Biography is required";
    }

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile image is required";
    }

    if (!formData.bannerImage) {
      newErrors.bannerImage = "Banner image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (
    fieldName: "profileImage" | "bannerImage",
    fileOrUrl: File | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fileOrUrl,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleImageDelete = (fieldName: "profileImage" | "bannerImage") => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleListChange = (
    fieldName: "education" | "barAdmission" | "professionalMemberships",
    items: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        description: "Check the form for errors and try again.",
        duration: 3000,
      });
      return;
    }

    try {
      await dispatch(createAttorney(formData)).unwrap();

      toast.success("Team member added successfully!", {
        description: "The new team member has been added.",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/admin/dashboard/our-team");
      }, 500);
    } catch (err: any) {
      toast.error(err || "Failed to add team member", {
        description: "Please try again later.",
        duration: 3000,
      });
    }
  };

  const handleCancel = () => {
    router.push("/admin/dashboard/our-team");
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Member</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ImageUpload
                label={
                  <span>
                    Upload profile <span className="text-red-500">*</span>
                  </span>
                }
                value={formData.profileImage || ""}
                onChange={(fileOrUrl) =>
                  handleImageChange("profileImage", fileOrUrl)
                }
                onDelete={() => handleImageDelete("profileImage")}
                aspectRatio="square"
                className="aspect-square max-w-[200px]"
              />
              {errors.profileImage && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.profileImage}
                </p>
              )}
            </div>

            <div>
              <ImageUpload
                label={
                  <span>
                    Upload banner <span className="text-red-500">*</span>
                  </span>
                }
                value={formData.bannerImage || ""}
                onChange={(fileOrUrl) =>
                  handleImageChange("bannerImage", fileOrUrl)
                }
                onDelete={() => handleImageDelete("bannerImage")}
                aspectRatio="banner"
              />
              {errors.bannerImage && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.bannerImage}
                </p>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-base font-semibold">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className={`mt-2 text-base ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="designation" className="text-base font-semibold">
                Role <span className="text-red-500">*</span>
              </Label>
              <Input
                id="designation"
                name="designation"
                type="text"
                value={formData.designation || ""}
                onChange={handleInputChange}
                placeholder="Lawyer"
                className={`mt-2 text-base ${
                  errors.designation ? "border-red-500" : ""
                }`}
              />
              {errors.designation && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.designation}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-semibold">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className={`mt-2 text-base ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-semibold">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className={`mt-2 text-base ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">
                Location <span className="text-red-500">*</span>
              </h3>

              <div className="space-y-2">
                <Label
                  htmlFor="line1"
                  className="text-base font-normal text-gray-600"
                >
                  Location Line 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="line1"
                  name="line1"
                  type="text"
                  value={formData.location.line1}
                  onChange={handleLocationChange}
                  placeholder="Lyric Tower"
                  className={`text-base ${
                    errors.line1 ? "border-red-500" : ""
                  }`}
                />
                {errors.line1 && (
                  <p className="text-sm text-red-500">{errors.line1}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="line2"
                  className="text-base font-normal text-gray-600"
                >
                  Location Line 2 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="line2"
                  name="line2"
                  type="text"
                  value={formData.location.line2 || ""}
                  onChange={handleLocationChange}
                  placeholder="440 Louisiana St., STE 900"
                  className={`text-base ${
                    errors.line2 ? "border-red-500" : ""
                  }`}
                />
                {errors.line2 && (
                  <p className="text-sm text-red-500">{errors.line2}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="line3"
                  className="text-base font-normal text-gray-600"
                >
                  Location Line 3 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="line3"
                  name="line3"
                  type="text"
                  value={formData.location.line3 || ""}
                  onChange={handleLocationChange}
                  placeholder="Houston, TX 77002"
                  className={`text-base ${
                    errors.line3 ? "border-red-500" : ""
                  }`}
                />
                {errors.line3 && (
                  <p className="text-sm text-red-500">{errors.line3}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="biography" className="text-base font-semibold">
                Biography <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                placeholder="Detailed biography about the team member"
                rows={6}
                className={`mt-2 resize-none text-base ${
                  errors.biography ? "border-red-500" : ""
                }`}
              />
              {errors.biography && (
                <p className="text-sm text-red-500 mt-1">{errors.biography}</p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Social Links{" "}
              <span className="text-sm text-gray-500 font-normal">
                (Optional)
              </span>
            </Label>

            <div>
              <Label htmlFor="facebook" className="text-sm text-gray-600">
                Facebook
              </Label>
              <Input
                id="facebook"
                name="facebook"
                type="url"
                value={formData.socialLinks?.facebook || ""}
                onChange={handleSocialLinkChange}
                placeholder="https://facebook.com/..."
                className="mt-1 text-base"
              />
            </div>

            <div>
              <Label htmlFor="twitter" className="text-sm text-gray-600">
                Twitter
              </Label>
              <Input
                id="twitter"
                name="twitter"
                type="url"
                value={formData.socialLinks?.twitter || ""}
                onChange={handleSocialLinkChange}
                placeholder="https://twitter.com/..."
                className="mt-1 text-base"
              />
            </div>

            <div>
              <Label htmlFor="linkedin" className="text-sm text-gray-600">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                value={formData.socialLinks?.linkedin || ""}
                onChange={handleSocialLinkChange}
                placeholder="https://linkedin.com/..."
                className="mt-1 text-base"
              />
            </div>
          </div>

          {/* Dynamic Lists */}
          <DynamicInputList
            label="Education"
            items={formData.education}
            onChange={(items) => handleListChange("education", items)}
            addButtonText="Add Education"
            placeholder="J.D., Harvard Law School - magna cum laude"
          />

          <DynamicInputList
            label="Bar Admissions"
            items={formData.barAdmission}
            onChange={(items) => handleListChange("barAdmission", items)}
            addButtonText="Add Bar Admission"
            placeholder="Texas and New York"
          />

          <DynamicInputList
            label="Professional Memberships"
            items={formData.professionalMemberships}
            onChange={(items) =>
              handleListChange("professionalMemberships", items)
            }
            addButtonText="Add Membership"
            placeholder="American Bar Association"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-8 text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-8 bg-primary-gold hover:bg-primary-gold/90 text-white text-base"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
