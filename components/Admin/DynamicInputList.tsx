// components/Admin/DynamicInputList.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface DynamicInputListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addButtonText: string;
  placeholder?: string;
}

export default function DynamicInputList({
  label,
  items,
  onChange,
  addButtonText,
  placeholder = "",
}: DynamicInputListProps) {
  const handleAdd = () => {
    onChange([...items, ""]);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{label}</Label>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 text-base"
              placeholder={placeholder}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={handleAdd}
        className="text-primary-gold hover:text-primary-gold/90 hover:bg-primary-gold/10 text-base"
      >
        <Plus className="w-5 h-5 mr-1" />
        {addButtonText}
      </Button>
    </div>
  );
}