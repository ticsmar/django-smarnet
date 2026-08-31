import type { KeyboardEvent } from "react";

export function rowActivateProps(onActivate?: () => void) {
  if (!onActivate) {
    return {};
  }
  return {
    role: "button" as const,
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate();
      }
    },
  };
}
