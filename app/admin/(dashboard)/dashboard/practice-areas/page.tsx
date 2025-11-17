"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import EditModal, {
  EditFormData,
  EditModalField,
} from "@/components/Admin/Modals/EditModal";
import ConfirmationModal from "@/components/Admin/Modals/ConfirmationModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPracticeAreas,
  updatePracticeArea,
  updatePracticeAreaStatus,
  clearError,
} from "@/redux/features/practiceAreas/practiceAreasSlice";
import type { PracticeArea } from "@/types/practiceArea";

const editFields: EditModalField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
    required: true,
    rows: 4,
  },
  {
    name: "image",
    label: "Image",
    type: "file",
    placeholder: "Choose File",
    required: false,
  },
];

export default function PracticeAreasPage() {
  const dispatch = useAppDispatch();
  const { practiceAreas, isLoading, error } = useAppSelector(
    (state) => state.practiceAreas
  );

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  // Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "activate" | "deactivate";
    id: string;
  } | null>(null);

  // Fetch practice areas on mount
  useEffect(() => {
    dispatch(fetchPracticeAreas({}));
  }, [dispatch]);

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

  // Handle Edit
  const handleEdit = (id: string) => {
    const area = practiceAreas.find((a) => a._id === id);
    if (area) {
      setSelectedArea(area);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (data: EditFormData) => {
    if (!selectedArea) return;

    try {
      const result = await dispatch(
        updatePracticeArea({
          id: selectedArea._id,
          data: {
            title: data.title as string,
            description: data.description as string,
            image: data.image as File | string | undefined,
          },
        })
      ).unwrap();

      toast.success("Practice area updated successfully", {
        description: "The practice area has been updated.",
        duration: 3000,
      });

      setIsEditModalOpen(false);
      setSelectedArea(null);
    } catch (err: any) {
      toast.error(err || "Failed to update practice area", {
        description: "Please try again.",
        duration: 3000,
      });
    }
  };

  // Handle Deactivate
  const handleDeactivate = (id: string) => {
    setConfirmAction({ type: "deactivate", id });
    setIsConfirmModalOpen(true);
  };

  // Handle Activate
  const handleActivate = (id: string) => {
    setConfirmAction({ type: "activate", id });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    try {
      await dispatch(
        updatePracticeAreaStatus({
          id: confirmAction.id,
          status: confirmAction.type === "activate" ? "active" : "inactive",
        })
      ).unwrap();

      toast.success(
        `Practice area ${
          confirmAction.type === "activate" ? "activated" : "deactivated"
        } successfully`,
        {
          description: `The practice area has been ${
            confirmAction.type === "activate" ? "activated" : "deactivated"
          }.`,
          duration: 3000,
        }
      );

      setIsConfirmModalOpen(false);
      setConfirmAction(null);
    } catch (err: any) {
      toast.error(err || "Failed to update practice area status", {
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

      {/* Practice Areas Table */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Practice Areas
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F2F2F2]" style={{ height: "45px" }}>
                <TableHead className="font-semibold text-gray-700 pl-6 text-base">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Description
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center pr-6 text-base">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && practiceAreas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500 text-base"
                  >
                    Loading practice areas...
                  </TableCell>
                </TableRow>
              ) : practiceAreas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500 text-base"
                  >
                    No practice areas found
                  </TableCell>
                </TableRow>
              ) : (
                practiceAreas.map((area) => (
                  <TableRow
                    key={area._id}
                    className="hover:bg-gray-50"
                    style={{ height: "80px" }}
                  >
                    <TableCell className="font-medium text-gray-900 pl-6 text-base">
                      {area.title}
                    </TableCell>
                    <TableCell className="text-gray-600 text-base">
                      {area.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          area.status === "active" ? "default" : "secondary"
                        }
                        className={
                          area.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100 text-base"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-100 text-base"
                        }
                      >
                        {area.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {area.status === "active" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeactivate(area._id)}
                            disabled={isLoading}
                            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 text-base"
                          >
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleActivate(area._id)}
                            disabled={isLoading}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-bold"
                          >
                            Activate
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(area._id)}
                          disabled={isLoading}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-base font-bold"
                        >
                          Edit
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

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={
          selectedArea
            ? {
                title: selectedArea.title,
                description: selectedArea.description,
                image: selectedArea.image || "",
              }
            : {}
        }
        title="Edit Practice Area"
        fields={editFields}
        isLoading={isLoading}
      />

      {/* Confirmation Modal */}
      {confirmAction && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setConfirmAction(null);
          }}
          onConfirm={handleConfirmAction}
          title={
            confirmAction.type === "activate"
              ? "Activate Practice Area"
              : "Deactivate Practice Area"
          }
          description={
            confirmAction.type === "activate"
              ? "Are you sure you want to activate this practice area? It will be visible to users."
              : "Are you sure you want to deactivate this practice area? It will be hidden from users."
          }
          confirmText={
            confirmAction.type === "activate" ? "Activate" : "Deactivate"
          }
          variant={confirmAction.type === "activate" ? "success" : "warning"}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
