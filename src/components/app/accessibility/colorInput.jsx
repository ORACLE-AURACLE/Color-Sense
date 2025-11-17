"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { validateHexColor } from "@/lib/utils/errorHandler";

export default function ColorInput({ label, value, onChange, onSwap }) {
  const [hexValue, setHexValue] = useState(value || "#000000");
  const inputRef = useRef(null);

  useEffect(() => {
    if (value !== hexValue) {
      setHexValue(value || "#000000");
    }
  }, [value]);

  const handleHexChange = (e) => {
    const newValue = e.target.value;
    setHexValue(newValue);
    
    // Allow partial input while typing
    if (/^#[0-9A-Fa-f]{0,6}$/.test(newValue)) {
      if (newValue.length === 7) {
        const validation = validateHexColor(newValue);
        if (validation.valid) {
          onChange?.(newValue);
        } else {
          toast.error("Invalid color", {
            description: validation.message,
            duration: 3000,
          });
        }
      }
    }
  };

  const handleColorPickerChange = (e) => {
    const newValue = e.target.value;
    setHexValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-xs sm:text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative shrink-0">
          <input
            type="color"
            value={hexValue}
            onChange={handleColorPickerChange}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md border-2 border-border cursor-pointer"
            title="Pick a color"
          />
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={hexValue}
          onChange={handleHexChange}
          placeholder="#000000"
          className="flex-1 font-mono text-sm sm:text-base"
          maxLength={7}
        />
        {onSwap && (
          <button
            type="button"
            onClick={onSwap}
            className="p-1.5 sm:p-2 rounded-md border hover:bg-accent transition-colors shrink-0"
            title="Swap colors"
          >
            <ArrowLeftRight className="size-3.5 sm:size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

