import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-700 bg-transparent px-3 py-1 text-base text-white shadow-sm transition-colors placeholder-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 hover:bg-gray-800 hover:border-gray-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
