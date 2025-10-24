// components/Admin/ImageUpload.tsx
"use client";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (file: File | null) => void;
  onDelete: () => void;
  aspectRatio?: "square" | "banner";
  className?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onDelete,
  aspectRatio = "banner",
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreview("");
    onDelete();
    const fileInput = document.getElementById(
      `image-upload-${label}`
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const aspectClasses = {
    square: "aspect-square",
    banner: "aspect-[16/6]",
  };

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">{label}</Label>

      {preview ? (
        <div
          className={cn(
            "relative w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200",
            aspectClasses[aspectRatio],
            className
          )}
        >
          <Image src={preview} alt={label} fill className="object-center" />
          <Button
            type="button"
            onClick={handleDelete}
            size="sm"
            className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md h-auto text-sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "relative w-full",
            aspectClasses[aspectRatio],
            className
          )}
        >
          <input
            id={`image-upload-${label}`}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <label
            htmlFor={`image-upload-${label}`}
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-base font-medium text-gray-700">
              Choose File
            </span>
            {aspectRatio === "banner" && (
              <span className="text-sm text-gray-500 mt-1">
                Recommended: 1200x450px (Banner size)
              </span>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
