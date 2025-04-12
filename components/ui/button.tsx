// components/ui/button.tsx
import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow transition-colors",
          variant === "default" && "bg-purple-600 text-white hover:bg-purple-700",
          variant === "secondary" && "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
