import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  type SemanticColor,
  type ColorTone,
  resolveColorTone,
} from "@/components/ui/color-tone";

export type ButtonColor = SemanticColor;
export type ButtonTone = ColorTone;

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
} as const;

const buttonVariants = cva(BUTTON_BASE, {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      success: "bg-success text-success-foreground hover:bg-success/90",
      warning: "bg-warning text-warning-foreground hover:bg-warning/90",
      alert: "bg-alert text-alert-foreground hover:bg-alert/90",
      info: "bg-info text-info-foreground hover:bg-info/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      "outline-primary":
        "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
      "outline-destructive":
        "border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: buttonSizes,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const SOLID_BY_COLOR: Record<ButtonColor, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
  warning: "bg-warning text-warning-foreground hover:bg-warning/90",
  alert: "bg-alert text-alert-foreground hover:bg-alert/90",
  info: "bg-info text-info-foreground hover:bg-info/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  neutral: "bg-muted text-foreground hover:bg-muted/80",
};

const LIGHT_BY_COLOR: Record<ButtonColor, string> = {
  primary: "bg-primary/10 text-primary hover:bg-primary/20",
  secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  tertiary: "bg-tertiary/10 text-tertiary hover:bg-tertiary/20",
  accent: "bg-accent/10 text-accent hover:bg-accent/20",
  success: "bg-success/10 text-success hover:bg-success/20",
  warning: "bg-warning/10 text-warning hover:bg-warning/20",
  alert: "bg-alert/10 text-alert hover:bg-alert/20",
  info: "bg-info/10 text-info hover:bg-info/20",
  destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  neutral: "bg-muted text-foreground hover:bg-muted/80",
};

const OUTLINE_BY_COLOR: Record<ButtonColor, string> = {
  primary: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
  secondary:
    "border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground",
  tertiary:
    "border border-tertiary bg-transparent text-tertiary hover:bg-tertiary hover:text-tertiary-foreground",
  accent: "border border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",
  success: "border border-success bg-transparent text-success hover:bg-success hover:text-success-foreground",
  warning: "border border-warning bg-transparent text-warning hover:bg-warning hover:text-warning-foreground",
  alert: "border border-alert bg-transparent text-alert hover:bg-alert hover:text-alert-foreground",
  info: "border border-info bg-transparent text-info hover:bg-info hover:text-info-foreground",
  destructive:
    "border border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground",
  neutral: "border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground",
};

export function buttonColorClasses(color: ButtonColor, tone: ButtonTone = "solid"): string {
  const resolved = resolveColorTone(tone, "solid");
  switch (resolved) {
    case "solid":
      return SOLID_BY_COLOR[color];
    case "soft":
      return LIGHT_BY_COLOR[color];
    case "outline":
      return OUTLINE_BY_COLOR[color];
    default: {
      const _exhaustive: never = resolved;
      return _exhaustive;
    }
  }
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Cor semântica. Quando definida, sobrepõe `variant` e combina com `tone`. */
  color?: ButtonColor;
  /** Tom da cor: solid | light | outline (`soft` é alias de light). Default: solid. */
  tone?: ButtonTone;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, tone = "solid", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const colorClasses = color ? buttonColorClasses(color, tone) : undefined;
    const sizeClass = color ? buttonSizes[size ?? "default"] : undefined;

    return (
      <Comp
        className={
          color
            ? cn(BUTTON_BASE, sizeClass, colorClasses, className)
            : cn(buttonVariants({ variant, size }), className)
        }
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
