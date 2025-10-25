// app/admin/(dashboard)/dashboard/our-team/edit/[id]/page.tsx
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
import { getTeamMemberById, TeamMember } from "@/data/team-members";

interface TeamMemberFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  biography: string;
  image: string | File;
  backgroundImage: string | File;
  education: string[];
  barAdmissions: string[];
  professionalMemberships: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<TeamMemberFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const member = getTeamMemberById(id);
        if (member) {
          setFormData({
            name: member.name,
            role: member.role,
            email: member.email,
            phone: member.phone,
            location: member.location,
            description: member.description,
            biography: member.biography,
            image: member.image,
            backgroundImage: member.backgroundImage,
            education: member.education,
            barAdmissions: member.barAdmissions,
            professionalMemberships: member.professionalMemberships,
            socialLinks: member.socialLinks || {
              facebook: "",
              twitter: "",
              linkedin: "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        toast.error("Failed to load member data");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMemberData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
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
    fieldName: keyof TeamMemberFormData,
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

  const handleImageDelete = (fieldName: keyof TeamMemberFormData) => {
    setFormData((prev) => (prev ? { ...prev, [fieldName]: "" } : null));
  };

  const handleListChange = (
    fieldName: keyof TeamMemberFormData,
    items: string[]
  ) => {
    setFormData((prev) => (prev ? { ...prev, [fieldName]: items } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Updated data:", formData);

      toast.success("Team member updated successfully!", {
        description: "All changes have been saved.",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/admin/dashboard/our-team");
      }, 500);
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Failed to update team member", {
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
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
              value={formData.image}
              onChange={(fileOrUrl) => handleImageChange("image", fileOrUrl)}
              onDelete={() => handleImageDelete("image")}
              aspectRatio="square"
              className="aspect-square max-w-[200px]"
            />

            <ImageUpload
              label="Upload banner"
              value={formData.backgroundImage}
              onChange={(fileOrUrl) =>
                handleImageChange("backgroundImage", fileOrUrl)
              }
              onDelete={() => handleImageDelete("backgroundImage")}
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
              <Label htmlFor="role" className="text-base font-semibold">
                Role
              </Label>
              <Input
                id="role"
                name="role"
                type="text"
                value={formData.role}
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
                placeholder="Houston, TX"
                className="mt-2 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description"
                rows={3}
                className="mt-2 resize-none text-base"
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
                value={formData.socialLinks.facebook || ""}
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
                value={formData.socialLinks.twitter || ""}
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
                value={formData.socialLinks.linkedin || ""}
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
            items={formData.barAdmissions}
            onChange={(items) => handleListChange("barAdmissions", items)}
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
