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
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditFormData) => void;
  initialData?: EditFormData;
  title?: string;
  fields: EditModalField[];
  isLoading?: boolean;
}

export interface EditFormData {
  [key: string]: string | File | null;
}

export interface EditModalField {
  name: string;
  label: string;
  type: "text" | "textarea" | "file";
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function EditModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title = "Edit Item",
  fields,
  isLoading = false,
}: EditModalProps) {
  const [formData, setFormData] = useState<EditFormData>(initialData);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);

      // Set initial image preview if exists
      const imageField = fields.find((field) => field.type === "file");
      if (imageField && initialData[imageField.name]) {
        const existingImage = initialData[imageField.name];
        if (typeof existingImage === "string") {
          setImagePreview(existingImage);
        }
      } else {
        setImagePreview("");
      }
    }
  }, [isOpen, initialData, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const { name } = e.target;

    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
    setImagePreview("");

    // Reset file input
    const fileInput = document.getElementById(fieldName) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setImagePreview("");
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
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-base font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>

              {field.type === "text" && (
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={(formData[field.name] as string) || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full text-base"
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={(formData[field.name] as string) || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={field.rows || 4}
                  className="w-full resize-none text-base"
                />
              )}

              {field.type === "file" && (
                <div className="space-y-4">
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative w-full aspect-[16/6] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(field.name)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* File Input */}
                  {!imagePreview && (
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="file"
                        onChange={handleFileChange}
                        required={field.required}
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor={field.name}
                        className="flex flex-col items-center justify-center w-full aspect-[16/6] px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-base font-medium text-gray-700">
                          {field.placeholder || "Choose File"}
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          Recommended: 1200x450px (Banner size)
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

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
