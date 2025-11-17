// app/admin/(dashboard)/dashboard/attorneys/edit/page.tsx
"use client";
import { useState, useEffect } from "react";
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
  fetchAttorneys,
  updateAttorney,
  clearError,
} from "@/redux/features/attorneys/attorneysSlice";
import type { AttorneyFormData } from "@/types/attorney";

export default function EditAttorneyPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { attorneys, isLoading, error } = useAppSelector(
    (state) => state.attorneys
  );

  // Get the first attorney (or you can modify this to get a specific attorney by ID)
  const attorney = attorneys.length > 0 ? attorneys[0] : null;

  const [formData, setFormData] = useState<AttorneyFormData>({
    name: "",
    email: "",
    phone: "",
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
  });

  // Fetch attorneys on mount
  useEffect(() => {
    if (attorneys.length === 0) {
      dispatch(fetchAttorneys({}));
    }
  }, [dispatch, attorneys.length]);

  // Update form data when attorney is loaded
  useEffect(() => {
    if (attorney) {
      setFormData({
        name: attorney.name,
        email: attorney.email,
        phone: attorney.phone,
        location: {
          line1: attorney.location.line1,
          line2: attorney.location.line2 || "",
          line3: attorney.location.line3 || "",
        },
        biography: attorney.biography,
        profileImage: attorney.profileImage || "",
        bannerImage: attorney.bannerImage || "",
        education: attorney.education || [],
        barAdmission: attorney.barAdmission || [],
        professionalMemberships: attorney.professionalMemberships || [],
      });
    }
  }, [attorney]);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };

  const handleImageChange = (
    fieldName: "profileImage" | "bannerImage",
    fileOrUrl: File | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fileOrUrl,
    }));
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

    if (!attorney) {
      toast.error("Attorney not found", {
        description: "Please try again later.",
        duration: 3000,
      });
      return;
    }

    try {
      await dispatch(
        updateAttorney({
          id: attorney._id,
          data: formData,
        })
      ).unwrap();

      toast.success("Attorney profile updated successfully!", {
        description: "All changes have been saved.",
        duration: 3000,
      });

      // Wait a bit for toast to show, then navigate
      setTimeout(() => {
        router.push("/admin/dashboard/attorneys");
      }, 500);
    } catch (err: any) {
      toast.error(err || "Failed to update attorney profile", {
        description: "Please try again later.",
        duration: 3000,
      });
    }
  };

  const handleCancel = () => {
    router.push("/admin/dashboard/attorneys");
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Attorney Profile
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
                  value={formData.location.line2}
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
                  value={formData.location.line3}
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
                rows={4}
                className="mt-2 resize-none text-base"
                required
              />
            </div>
          </div>

          {/* Dynamic Lists */}
          <DynamicInputList
            label="Education"
            items={formData.education}
            onChange={(items) => handleListChange("education", items)}
            addButtonText="Add Education"
          />

          <DynamicInputList
            label="Bar Admission"
            items={formData.barAdmission}
            onChange={(items) => handleListChange("barAdmission", items)}
            addButtonText="Add Bar Admission"
          />

          <DynamicInputList
            label="Professional Memberships"
            items={formData.professionalMemberships}
            onChange={(items) =>
              handleListChange("professionalMemberships", items)
            }
            addButtonText="Add Membership"
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
