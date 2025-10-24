// components/Admin/DynamicInputList.tsx
"use client";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DynamicInputListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addButtonText: string;
}

export default function DynamicInputList({
  label,
  items,
  onChange,
  addButtonText,
}: DynamicInputListProps) {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleAddItem = () => {
    onChange([...items, ""]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{label}</Label>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <Input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="flex-1 text-base"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0 rounded-md"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={handleAddItem}
        className="text-[#D4AF37] hover:text-[#C4A137] hover:bg-[#D4AF37]/10 text-base"
      >
        <Plus className="w-5 h-5 mr-2" />
        {addButtonText}
      </Button>
    </div>
  );
}
