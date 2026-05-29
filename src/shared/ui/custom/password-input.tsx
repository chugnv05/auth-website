import { cn } from "@/shared/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Button } from "../button";
import { Input } from "../input";

export interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "size"> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
    return (
      <div className="relative">
        <Input
          ref={ref}
          variant="basic"
          className={cn("pr-10", className)}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>
    );
  },
);
