"use client";
import { useState } from "react";
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

interface PracticeArea {
  id: number;
  title: string;
  description: string;
  status: "active" | "inactive";
  image?: string;
}

const initialData: PracticeArea[] = [
  {
    id: 1,
    title: "Criminal Defense",
    description:
      "Federal & State Criminal Defense, DUI, Drug Offenses, Violent Crimes, Theft, Domestic Violence, and more.",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&h=450&fit=crop",
  },
  {
    id: 2,
    title: "White Collar Defense",
    description:
      "Securities fraud, tax evasion, embezzlement, money laundering, insider trading, and corporate crimes.",
    status: "inactive",
  },
];

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
  const [practiceAreas, setPracticeAreas] =
    useState<PracticeArea[]>(initialData);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "activate" | "deactivate";
    id: number;
  } | null>(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  // Handle Edit
  const handleEdit = (id: number) => {
    const area = practiceAreas.find((a) => a.id === id);
    if (area) {
      setSelectedArea(area);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (data: EditFormData) => {
    if (!selectedArea) return;

    setIsEditLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPracticeAreas((prev) =>
        prev.map((area) =>
          area.id === selectedArea.id
            ? {
                ...area,
                title: data.title as string,
                description: data.description as string,
              }
            : area
        )
      );

      setIsEditModalOpen(false);
      console.log("Updated:", data);
    } catch (error) {
      console.error("Error updating:", error);
    } finally {
      setIsEditLoading(false);
    }
  };

  // Handle Deactivate
  const handleDeactivate = (id: number) => {
    setConfirmAction({ type: "deactivate", id });
    setIsConfirmModalOpen(true);
  };

  // Handle Activate
  const handleActivate = (id: number) => {
    setConfirmAction({ type: "activate", id });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    setIsConfirmLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPracticeAreas((prev) =>
        prev.map((area) =>
          area.id === confirmAction.id
            ? {
                ...area,
                status:
                  confirmAction.type === "activate" ? "active" : "inactive",
              }
            : area
        )
      );

      setIsConfirmModalOpen(false);
      console.log(
        `${confirmAction.type === "activate" ? "Activated" : "Deactivated"}:`,
        confirmAction.id
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsConfirmLoading(false);
      setConfirmAction(null);
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
              {practiceAreas.map((area) => (
                <TableRow
                  key={area.id}
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
                          onClick={() => handleDeactivate(area.id)}
                          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 text-base"
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActivate(area.id)}
                          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-bold"
                        >
                          Activate
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(area.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-base font-bold"
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
        isLoading={isEditLoading}
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
          isLoading={isConfirmLoading}
        />
      )}
    </div>
  );
}
