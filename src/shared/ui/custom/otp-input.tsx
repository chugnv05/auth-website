import { cn } from "@/shared/lib/utils";
import { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // valid mini input
  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const current = value.split("");
    current[index] = digit;
    const next = current.join("").slice(0, length);
    onChange(next);
    // focus o tiep neu co digit
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const current = value.split("");
      if (!current[index] && index > 0) {
        current[index - 1] = "";
        onChange(current.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        current[index] = "";
        onChange(current.join(""));
      }
    }
  };

  // past
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    // focus o cuoi dc paste
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value?.[index] ?? ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "size-12 rounded-lg border-2 text-center text-xl font-bold",
            "bg-background text-crimson-red caret-transparent",
            "transition-all duration-200 outline-none",
            "focus:border-crimson-red focus:shadow-sm",
            value?.[index] ? "border-crimson-red/60" : "border-border",
          )}
        />
      ))}
    </div>
  );
}
