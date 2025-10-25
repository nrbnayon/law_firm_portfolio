// components/Admin/Modals/LogoutConfirmationModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: LogoutConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-[#10101080]" />
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
              <LogOut className="w-6 h-6 text-primary-gold" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Confirm Logout
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-base text-gray-600">
            Are you sure you want to logout? You will need to login again to
            access the dashboard.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 text-base"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 bg-yellow-600 hover:bg-yellow-700 text-white text-base"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
