// components/Admin/Modals/InsightModal.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InsightFormData } from "@/types/insights";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InsightFormData) => void;
  initialData?: InsightFormData;
  title: string;
  isLoading?: boolean;
}

export default function InsightModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  isLoading = false,
}: InsightModalProps) {
  const [formData, setFormData] = useState<InsightFormData>({
    title: "",
    type: "",
    description: "",
    outcome: "",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      setFormData({
        title: "",
        type: "",
        description: "",
        outcome: "",
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      type: "",
      description: "",
      outcome: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-[#10101080]" />
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              Title
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Not Guilty Verdict in State Felon Trial"
              required
              className="w-full text-base"
            />
          </div>

          {/* Type Field */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-medium">
              Type
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="type"
              name="type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              placeholder="Criminal Defense"
              required
              className="w-full text-base"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Defended client against serious felony charges carrying potential 15-year sentence."
              required
              rows={4}
              className="w-full resize-none text-base"
            />
          </div>

          {/* Outcome Field */}
          <div className="space-y-2">
            <Label htmlFor="outcome" className="text-base font-medium">
              Outcome
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea
              id="outcome"
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              placeholder="Full acquittal after week-long jury trial."
              required
              rows={3}
              className="w-full resize-none text-base"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 text-base rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 bg-primary-gold rounded-md hover:bg-primary-gold/90 text-white text-base"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
