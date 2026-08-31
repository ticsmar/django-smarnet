import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export type SearchFieldSize = "sm" | "md" | "lg";

const sizeClasses: Record<SearchFieldSize, string> = {
  sm: "h-8 pl-8 text-xs",
  md: "h-10 pl-9 text-sm",
  lg: "h-12 pl-10 text-base",
};

const iconOffset: Record<SearchFieldSize, string> = {
  sm: "left-2.5",
  md: "left-3",
  lg: "left-3",
};

export interface SearchFieldProps
  extends Omit<React.ComponentProps<"input">, "size" | "type"> {
  size?: SearchFieldSize;
  containerClassName?: string;
  onValueChange?: (value: string) => void;
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      containerClassName,
      size = "md",
      onChange,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative min-w-0 flex-1", containerClassName)}>
        <Search
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
            iconOffset[size],
          )}
        />
        <Input
          ref={ref}
          type="search"
          className={cn(sizeClasses[size], className)}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.target.value);
          }}
          {...props}
        />
      </div>
    );
  },
);
SearchField.displayName = "SearchField";
