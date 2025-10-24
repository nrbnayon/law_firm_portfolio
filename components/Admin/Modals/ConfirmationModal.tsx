"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success" | "warning";
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false,
}: ConfirmationModalProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
          iconBg: "bg-red-100",
          buttonClass: "bg-red-600 hover:bg-red-700 text-white",
        };
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          iconBg: "bg-green-100",
          buttonClass: "bg-green-600 hover:bg-green-700 text-white",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
          iconBg: "bg-yellow-100",
          buttonClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
        };
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-gray-600" />,
          iconBg: "bg-gray-100",
          buttonClass: "bg-gray-600 hover:bg-gray-700 text-white",
        };
    }
  };

  const styles = getVariantStyles();

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-[#10101080]" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${styles.iconBg}`}
            >
              {styles.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-base text-gray-600 mt-4 pl-16">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 text-base rounded-md"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-6 text-base rounded-md ${styles.buttonClass}`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
