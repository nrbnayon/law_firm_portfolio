// app/admin/dashboard/insights/page.tsx
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
import { Plus } from "lucide-react";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import InsightModal from "@/components/Admin/Modals/InsightModal";
import ConfirmationModal from "@/components/Admin/Modals/ConfirmationModal";
import DeleteConfirmationModal from "@/components/Admin/Modals/DeleteConfirmationModal";
import { InsightFormData } from "@/types/insights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchInsights,
  createInsight,
  updateInsight,
  deleteInsight,
  updateInsightStatus,
  clearError,
} from "@/redux/features/insights/insightsSlice";

export default function InsightsPage() {
  const dispatch = useAppDispatch();
  const { insights, isLoading, error } = useAppSelector(
    (state) => state.insights
  );

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInsightId, setSelectedInsightId] = useState<string | null>(
    null
  );

  // Status Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "activate" | "deactivate";
    id: string;
  } | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInsightId, setDeleteInsightId] = useState<string | null>(null);

  // Fetch insights on mount
  useEffect(() => {
    dispatch(fetchInsights({}));
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

  // Handle Add
  const handleAddSubmit = async (data: InsightFormData) => {
    try {
      await dispatch(createInsight(data)).unwrap();

      toast.success("Insight created successfully", {
        description: "The case insight has been added.",
        duration: 3000,
      });

      setIsAddModalOpen(false);
    } catch (err: any) {
      toast.error(err || "Failed to create insight", {
        description: "Please try again.",
        duration: 3000,
      });
    }
  };

  // Handle Edit
  const handleEdit = (id: string) => {
    setSelectedInsightId(id);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (data: InsightFormData) => {
    if (!selectedInsightId) return;

    try {
      await dispatch(updateInsight({ id: selectedInsightId, data })).unwrap();

      toast.success("Insight updated successfully", {
        description: "The case insight has been updated.",
        duration: 3000,
      });

      setIsEditModalOpen(false);
      setSelectedInsightId(null);
    } catch (err: any) {
      toast.error(err || "Failed to update insight", {
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
        updateInsightStatus({
          id: confirmAction.id,
          status: confirmAction.type === "activate" ? "active" : "inactive",
        })
      ).unwrap();

      toast.success(
        `Insight ${
          confirmAction.type === "activate" ? "activated" : "deactivated"
        } successfully`,
        {
          description: `The case insight has been ${
            confirmAction.type === "activate" ? "activated" : "deactivated"
          }.`,
          duration: 3000,
        }
      );

      setIsConfirmModalOpen(false);
      setConfirmAction(null);
    } catch (err: any) {
      toast.error(err || "Failed to update insight status", {
        description: "Please try again.",
        duration: 3000,
      });
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    setDeleteInsightId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteInsightId) return;

    try {
      await dispatch(deleteInsight(deleteInsightId)).unwrap();

      toast.success("Insight deleted successfully", {
        description: "The case insight has been deleted.",
        duration: 3000,
      });

      setIsDeleteModalOpen(false);
      setDeleteInsightId(null);
    } catch (err: any) {
      toast.error(err || "Failed to delete insight", {
        description: "Please try again.",
        duration: 3000,
      });
    }
  };

  const selectedInsight = selectedInsightId
    ? insights.find((i) => i._id === selectedInsightId)
    : null;

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
              {isLoading && insights.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500 text-base"
                  >
                    Loading insights...
                  </TableCell>
                </TableRow>
              ) : insights.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500 text-base"
                  >
                    No insights found
                  </TableCell>
                </TableRow>
              ) : (
                insights.map((insight) => (
                  <TableRow
                    key={insight._id}
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
                      {insight.createdAt
                        ? new Date(insight.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
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
                            onClick={() => handleDeactivate(insight._id)}
                            disabled={isLoading}
                            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 text-base"
                          >
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleActivate(insight._id)}
                            disabled={isLoading}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-base font-bold"
                          >
                            Activate
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(insight._id)}
                          disabled={isLoading}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-base font-bold"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(insight._id)}
                          disabled={isLoading}
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

      {/* Add Modal */}
      <InsightModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        title="Add insights"
        isLoading={isLoading}
      />

      {/* Edit Modal */}
      <InsightModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedInsightId(null);
        }}
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
        isLoading={isLoading}
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
          isLoading={isLoading}
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
        isLoading={isLoading}
      />
    </div>
  );
}
