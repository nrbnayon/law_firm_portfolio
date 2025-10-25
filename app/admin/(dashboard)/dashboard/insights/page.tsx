// app/admin/dashboard/insights/page.tsx
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
import { Plus } from "lucide-react";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import InsightModal from "@/components/Admin/Modals/InsightModal";
import ConfirmationModal from "@/components/Admin/Modals/ConfirmationModal";
import DeleteConfirmationModal from "@/components/Admin/Modals/DeleteConfirmationModal";
import { CaseInsight, InsightFormData } from "@/types/insights";

const initialData: CaseInsight[] = [
  {
    id: 1,
    title: "State Felony Trial",
    type: "Criminal Defense",
    description:
      "Defended client against serious felony charges carrying potential 15-year sentence.",
    outcome: "Full acquittal after week-long jury trial.",
    date: "Jan 6, 2025",
    status: "active",
  },
  {
    id: 2,
    title: "Federal Securities Fraud",
    type: "White Collar Defense",
    description:
      "Complex securities fraud case involving multiple defendants and jurisdictions.",
    outcome: "Charges dismissed after successful motion to suppress evidence.",
    date: "Jan 6, 2025",
    status: "inactive",
  },
  {
    id: 3,
    title: "State Felony Trial",
    type: "Criminal Defense",
    description:
      "High-profile criminal defense case with extensive media coverage.",
    outcome: "Reduced charges and favorable plea agreement.",
    date: "Jan 6, 2025",
    status: "active",
  },
  {
    id: 4,
    title: "Federal Securities Fraud",
    type: "White Collar Defense",
    description:
      "Multi-million dollar fraud case with international implications.",
    outcome: "Negotiated settlement avoiding criminal prosecution.",
    date: "Jan 6, 2025",
    status: "active",
  },
];

export default function InsightsPage() {
  const [insights, setInsights] = useState<CaseInsight[]>(initialData);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<CaseInsight | null>(
    null
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Status Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "activate" | "deactivate";
    id: number;
  } | null>(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInsightId, setDeleteInsightId] = useState<number | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Handle Add
  const handleAddSubmit = async (data: InsightFormData) => {
    setIsAddLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newInsight: CaseInsight = {
        id: insights.length + 1,
        ...data,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "active",
      };

      setInsights((prev) => [...prev, newInsight]);
      setIsAddModalOpen(false);
      console.log("Added:", data);
    } catch (error) {
      console.error("Error adding:", error);
    } finally {
      setIsAddLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (id: number) => {
    const insight = insights.find((i) => i.id === id);
    if (insight) {
      setSelectedInsight(insight);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (data: InsightFormData) => {
    if (!selectedInsight) return;

    setIsEditLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setInsights((prev) =>
        prev.map((insight) =>
          insight.id === selectedInsight.id
            ? {
                ...insight,
                ...data,
              }
            : insight
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

      setInsights((prev) =>
        prev.map((insight) =>
          insight.id === confirmAction.id
            ? {
                ...insight,
                status:
                  confirmAction.type === "activate" ? "active" : "inactive",
              }
            : insight
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

  // Handle Delete
  const handleDelete = (id: number) => {
    setDeleteInsightId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteInsightId) return;

    setIsDeleteLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setInsights((prev) =>
        prev.filter((insight) => insight.id !== deleteInsightId)
      );
      setIsDeleteModalOpen(false);
      console.log("Deleted:", deleteInsightId);
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsDeleteLoading(false);
      setDeleteInsightId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Here you can manage your website"
      />

      {/* Case Insights Table */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Case Insights</h2>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-gold hover:bg-primary-gold/90 text-white text-base rounded-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Insights
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F2F2F2]" style={{ height: "45px" }}>
                <TableHead className="font-semibold text-gray-700 pl-6 text-base">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-base">
                  Date
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
              {insights.map((insight) => (
                <TableRow
                  key={insight.id}
                  className="hover:bg-gray-50"
                  style={{ height: "80px" }}
                >
                  <TableCell className="font-medium text-gray-900 pl-6 text-base">
                    {insight.title}
                  </TableCell>
                  <TableCell className="text-gray-600 text-base">
                    {insight.type}
                  </TableCell>
                  <TableCell className="text-gray-600 text-base">
                    {insight.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        insight.status === "active" ? "default" : "secondary"
                      }
                      className={
                        insight.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100 text-base"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100 text-base"
                      }
                    >
                      {insight.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {insight.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeactivate(insight.id)}
                          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 text-base"
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActivate(insight.id)}
                          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-bold"
                        >
                          Activate
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(insight.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-base font-bold"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(insight.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 text-base font-bold"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Modal */}
      <InsightModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        title="Add insights"
        isLoading={isAddLoading}
      />

      {/* Edit Modal */}
      <InsightModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={
          selectedInsight
            ? {
                title: selectedInsight.title,
                type: selectedInsight.type,
                description: selectedInsight.description,
                outcome: selectedInsight.outcome,
              }
            : undefined
        }
        title="Edit Case Insights"
        isLoading={isEditLoading}
      />

      {/* Status Confirmation Modal */}
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
              ? "Activate Case Insight"
              : "Deactivate Case Insight"
          }
          description={
            confirmAction.type === "activate"
              ? "Are you sure you want to activate this case insight? It will be visible to users."
              : "Are you sure you want to deactivate this case insight? It will be hidden from users."
          }
          confirmText={
            confirmAction.type === "activate" ? "Activate" : "Deactivate"
          }
          variant={confirmAction.type === "activate" ? "success" : "warning"}
          isLoading={isConfirmLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteInsightId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Case Insight"
        description="Are you sure you want to delete this case insight? This action cannot be undone."
        isLoading={isDeleteLoading}
      />
    </div>
  );
}
