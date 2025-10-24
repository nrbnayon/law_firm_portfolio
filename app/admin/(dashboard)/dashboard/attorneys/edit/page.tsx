// app/admin/(dashboard)/dashboard/attorneys/edit/page.tsx
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

interface AttorneyData {
  name: string;
  email: string;
  phone: string;
  location: string;
  biography: string;
  profileImage: string | File;
  bannerImage: string | File;
  education: string[];
  barAdmission: string[];
  professionalMemberships: string[];
}

const initialData: AttorneyData = {
  name: "Chauntelle Wood",
  email: "info@cwwhitelaw.com",
  phone: "713-236-7700",
  location: "Lyric Tower 440 Louisiana St, STE 900, Houston TX 77002",
  biography:
    "Chauntelle Wood White is the Founding Attorney of C.W. White. A seasoned first-chair trial lawyer, she has successfully tried more than 40 jury and bench trials across criminal and civil matters. Her background spans public service and elite, big-law firm practice.",
  profileImage: "/user.png",
  bannerImage: "/attorney.png",
  education: [
    "J.D., Southern University Law Center - cum laude, Law Review Senior Editor and Moot Court Board Member",
    "B.S., Cameron University",
  ],
  barAdmission: [
    "State Bar of Texas",
    "U.S. District Courts for the Northern, Western, and Southern Districts of Texas",
  ],
  professionalMemberships: [
    "Federal Bar Association",
    "Houston Bar Association",
  ],
};

export default function EditAttorneyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<AttorneyData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    fieldName: keyof AttorneyData,
    fileOrUrl: File | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fileOrUrl,
    }));
  };

  const handleImageDelete = (fieldName: keyof AttorneyData) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleListChange = (fieldName: keyof AttorneyData, items: string[]) => {
    setFormData((prev) => ({ ...prev, [fieldName]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Submitted data:", formData);

      // Show success toast
      toast.success("Attorney profile updated successfully!", {
        description: "All changes have been saved.",
        duration: 3000,
      });

      // Wait a bit for toast to show, then navigate
      setTimeout(() => {
        router.push("/admin/dashboard/attorneys");
      }, 500);
    } catch (error) {
      console.error("Error saving attorney:", error);
      toast.error("Failed to update attorney profile", {
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
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
              value={formData.profileImage}
              onChange={(fileOrUrl) =>
                handleImageChange("profileImage", fileOrUrl)
              }
              onDelete={() => handleImageDelete("profileImage")}
              aspectRatio="square"
              className="aspect-square max-w-[200px]"
            />

            <ImageUpload
              label="Upload banner"
              value={formData.bannerImage}
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

            <div>
              <Label htmlFor="location" className="text-base font-semibold">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-2 text-base"
                required
              />
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
