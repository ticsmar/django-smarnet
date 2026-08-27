/**
 * Shared visual states for form controls.
 *
 * - Active: bg-background, border-input, text-foreground
 * - Readonly: slightly darker fill, same border as active, normal text, not-allowed cursor
 * - Disabled: muted fill, lighter border, lighter text, not-allowed cursor
 *
 * Native inputs use :read-only. Radix/select uses aria-readonly (often together with
 * disabled so the control cannot open). Disabled styles skip [aria-readonly] so
 * a read-only select is not faded.
 */
export const fieldControlClassName = [
  "read-only:cursor-not-allowed read-only:bg-muted read-only:border-input read-only:text-foreground",
  "aria-readonly:cursor-not-allowed aria-readonly:bg-muted aria-readonly:border-input aria-readonly:text-foreground",
  "disabled:cursor-not-allowed disabled:opacity-100",
  "disabled:[&:not([aria-readonly])]:bg-muted/50",
  "disabled:[&:not([aria-readonly])]:border-muted-foreground/25",
  "disabled:[&:not([aria-readonly])]:text-muted-foreground",
  "disabled:[&:not([aria-readonly])]:placeholder:text-muted-foreground/60",
].join(" ");

/** Checkbox, radio and switch — same intent, primary border when active. */
export const choiceControlClassName = [
  "aria-readonly:cursor-not-allowed aria-readonly:bg-muted",
  "disabled:cursor-not-allowed disabled:opacity-100",
  "disabled:[&:not([aria-readonly])]:border-muted-foreground/30",
  "disabled:[&:not([aria-readonly])]:data-[state=checked]:bg-muted-foreground/35",
  "disabled:[&:not([aria-readonly])]:data-[state=checked]:text-muted-foreground",
  "disabled:[&:not([aria-readonly])]:data-[state=unchecked]:bg-muted/50",
].join(" ");
