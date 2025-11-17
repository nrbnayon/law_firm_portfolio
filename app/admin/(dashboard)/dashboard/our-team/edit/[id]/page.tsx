"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  fetchAttorneyById,
  updateAttorney,
  clearError,
  clearSelectedAttorney,
} from "@/redux/features/attorneys/attorneysSlice";
import type { AttorneyFormData } from "@/types/attorney";

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const { selectedAttorney, isLoading, error } = useAppSelector(
    (state) => state.attorneys
  );

  const [formData, setFormData] = useState<AttorneyFormData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch attorney data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAttorneyById(id)).unwrap();
      } catch (err: any) {
        toast.error(err || "Failed to load team member data");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();

    return () => {
      dispatch(clearSelectedAttorney());
    };
  }, [dispatch, id]);

  // Update form data when attorney is loaded
  useEffect(() => {
    if (selectedAttorney) {
      setFormData({
        name: selectedAttorney.name,
        email: selectedAttorney.email,
        phone: selectedAttorney.phone,
        designation: selectedAttorney.designation || "",
        location: {
          line1: selectedAttorney.location.line1,
          line2: selectedAttorney.location.line2 || "",
          line3: selectedAttorney.location.line3 || "",
        },
        biography: selectedAttorney.biography,
        profileImage: selectedAttorney.profileImage || "",
        bannerImage: selectedAttorney.bannerImage || "",
        education: selectedAttorney.education || [],
        barAdmission: selectedAttorney.barAdmission || [],
        professionalMemberships: selectedAttorney.professionalMemberships || [],
        socialLinks: selectedAttorney.socialLinks || {
          facebook: "",
          twitter: "",
          linkedin: "",
        },
      });
    }
  }, [selectedAttorney]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            location: {
              ...prev.location,
              [name]: value,
            },
          }
        : null
    );
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            socialLinks: {
              ...prev.socialLinks,
              [name]: value,
            },
          }
        : null
    );
  };

  const handleImageChange = (
    fieldName: "profileImage" | "bannerImage",
    fileOrUrl: File | string
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [fieldName]: fileOrUrl,
          }
        : null
    );
  };

  const handleImageDelete = (fieldName: "profileImage" | "bannerImage") => {
    setFormData((prev) => (prev ? { ...prev, [fieldName]: "" } : null));
  };

  const handleListChange = (
    fieldName: "education" | "barAdmission" | "professionalMemberships",
    items: string[]
  ) => {
    setFormData((prev) => (prev ? { ...prev, [fieldName]: items } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await dispatch(
        updateAttorney({
          id,
          data: formData,
        })
      ).unwrap();

      toast.success("Team member updated successfully!", {
        description: "All changes have been saved.",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/admin/dashboard/our-team");
      }, 500);
    } catch (err: any) {
      toast.error(err || "Failed to update team member", {
        description: "Please try again later.",
        duration: 3000,
      });
    }
  };

  const handleCancel = () => {
    router.push("/admin/dashboard/our-team");
  };

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Admin Dashboard"
          subtitle="Here you can manage your website"
        />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-center text-gray-600 text-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Admin Dashboard"
          subtitle="Here you can manage your website"
        />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-center text-red-600 text-base">
            Team member not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Team Member
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <ImageUpload
              label="Upload profile"
              value={formData.profileImage || ""}
              onChange={(fileOrUrl) =>
                handleImageChange("profileImage", fileOrUrl)
              }
              onDelete={() => handleImageDelete("profileImage")}
              aspectRatio="square"
              className="aspect-square max-w-[200px]"
            />

            <ImageUpload
              label="Upload banner"
              value={formData.bannerImage || ""}
              onChange={(fileOrUrl) =>
                handleImageChange("bannerImage", fileOrUrl)
              }
              onDelete={() => handleImageDelete("bannerImage")}
              aspectRatio="banner"
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-base font-semibold">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="mt-2 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="designation" className="text-base font-semibold">
                Role
              </Label>
              <Input
                id="designation"
                name="designation"
                type="text"
                value={formData.designation || ""}
                onChange={handleInputChange}
                placeholder="Lawyer"
                className="mt-2 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className="mt-2 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-semibold">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="mt-2 text-base"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">
                Location
              </h3>

              <div className="space-y-2">
                <Label
                  htmlFor="line1"
                  className="text-base font-normal text-gray-600"
                >
                  Location Line 1
                </Label>
                <Input
                  id="line1"
                  name="line1"
                  type="text"
                  value={formData.location.line1}
                  onChange={handleLocationChange}
                  placeholder="Lyric Tower"
                  className="text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="line2"
                  className="text-base font-normal text-gray-600"
                >
                  Location Line 2
                </Label>
                <Input
                  id="line2"
                  name="line2"
                  type="text"
                  value={formData.location.line2 || ""}
                  onChange={handleLocationChange}
                  placeholder="440 Louisiana St., STE 900"
                  className="text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="line3"
                  className="text-base font-normal text-gray-600"
                >
                  Location Line 3
                </Label>
                <Input
                  id="line3"
                  name="line3"
                  type="text"
                  value={formData.location.line3 || ""}
                  onChange={handleLocationChange}
                  placeholder="Houston, TX 77002"
                  className="text-base"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="biography" className="text-base font-semibold">
                Biography
              </Label>
              <Textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                placeholder="Full biography"
                rows={6}
                className="mt-2 resize-none text-base"
                required
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Social Links</Label>

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
