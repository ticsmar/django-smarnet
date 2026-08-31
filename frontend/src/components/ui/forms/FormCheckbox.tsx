import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface FormCheckboxProps extends Omit<React.ComponentProps<typeof Checkbox>, "id"> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  /** Layout em "card" — usa surface elevada */
  variant?: "inline" | "card";
  readOnly?: boolean;
  className?: string;
}

export const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  FormCheckboxProps
>(
  (
    {
      id: idProp,
      label,
      description,
      error,
      variant = "inline",
      className,
      readOnly,
      onCheckedChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const locked = Boolean(readOnly);
    const handleChange = locked ? undefined : onCheckedChange;

    const control = (
      <Checkbox
        id={id}
        ref={ref}
        className="mt-0.5"
        disabled={disabled}
        aria-readonly={locked || undefined}
        onCheckedChange={handleChange}
        {...props}
      />
    );

    if (variant === "card") {
      return (
        <label
          htmlFor={id}
          className={cn(
            "flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-background hover:bg-muted/30 transition-colors cursor-pointer",
            (disabled || locked) && "cursor-not-allowed hover:bg-background",
            disabled && !locked && "opacity-60",
            error && "border-destructive",
            className,
          )}
        >
          {control}
          <div className="flex-1 min-w-0">
            {label && <p className="text-sm font-medium text-foreground">{label}</p>}
            {description && (
              <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
            )}
            {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
          </div>
        </label>
      );
    }

    return (
      <div className={cn("flex items-start gap-2.5", className)}>
        {control}
        <div className="flex-1 min-w-0">
          {label && (
            <Label
              htmlFor={id}
              className={cn(
                "text-sm leading-tight",
                disabled || locked ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              {label}
            </Label>
          )}
          {description && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
          )}
          {error && <p className="text-[11px] text-destructive mt-0.5">{error}</p>}
        </div>
      </div>
    );
  },
);
FormCheckbox.displayName = "FormCheckbox";
