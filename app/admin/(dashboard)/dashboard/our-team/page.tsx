// app/admin/(dashboard)/dashboard/our-team/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Image from "next/image";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import DeleteConfirmationModal from "@/components/Admin/Modals/DeleteConfirmationModal";
import { teamMembers, TeamMember } from "@/data/team-members";

export default function OurTeamPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Filter team members based on search
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    router.push("/admin/dashboard/our-team/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/our-team/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteMemberId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteMemberId) return;

    setIsDeleteLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMembers((prev) =>
        prev.filter((member) => member.id !== deleteMemberId)
      );
      setIsDeleteModalOpen(false);
      console.log("Deleted member:", deleteMemberId);
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setIsDeleteLoading(false);
      setDeleteMemberId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      {/* Our Team Table */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6 flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-semibold text-gray-900">Our Team</h2>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px] text-base"
              />
            </div>

            {/* Add Member Button */}
            <Button
              onClick={handleAddMember}
              className="bg-primary-gold hover:bg-primary-gold/90 text-white text-base rounded-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Member
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F2F2F2]" style={{ height: "45px" }}>
                <TableHead className="font-semibold text-gray-700 pl-6 text-base">
                  Service giver
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Location
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center pr-6 text-base">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500 text-base"
                  >
                    No team members found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow
                    key={member.id}
                    className="hover:bg-gray-50"
                    style={{ height: "80px" }}
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-900 text-base">
                          {member.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-base">
                      {member.email}
                    </TableCell>
                    <TableCell className="text-gray-600 text-base">
                      {member.role}
                    </TableCell>
                    <TableCell className="text-gray-600 text-base">
                      {member.location}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(member.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-base font-bold"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-base font-bold"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteMemberId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member"
        description="Are you sure you want to delete this team member? This action cannot be undone."
        isLoading={isDeleteLoading}
      />
    </div>
  );
}
