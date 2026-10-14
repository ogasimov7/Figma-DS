/**
 * APPROACH 2: SHADCN/UI BUTTON
 *
 * Teach this after the raw button. Same Figma spec and tokens, different
 * foundation. Props are identical to ActionButton so the two are swappable:
 *   variant, appearance, state, disabled, size, iconLeft, iconRight, label (children)
 *
 * Files in this approach:
 *   components/ui/button.tsx       →  shadcn Button primitive (cva, Radix) — unchanged
 *   action-button-shadcn.tsx       →  Wraps shadcn Button, maps Figma props to data-*
 *   action-button-shadcn.css       →  Token values over the shadcn base classes
 *   action-button-spec.ts          →  Figma combinations + token map (shared)
 *
 * Key difference: renders <Button variant="action"> so shadcn's base classes
 * (layout, focus ring, disabled behaviour) stay in place; the "action"
 * variant adds no colours — action-button-shadcn.css supplies them.
 *
 * For the raw version, see action-button.tsx
 */
import * as React from "react";

import type { ActionButtonProps } from "@/components/design-system/action-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ActionButtonShadcnProps = ActionButtonProps;

export function ActionButtonShadcn({
  variant = "primary",
  appearance = "filled",
  state,
  size = "md",
  iconLeft = false,
  iconRight = false,
  className,
  children,
  disabled,
  ...props
}: ActionButtonShadcnProps) {
  return (
    <Button
      type="button"
      variant="action"
      disabled={disabled}
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      /* Figma only has disabled in the default state */
      data-state={disabled ? undefined : state}
      className={cn("action-button-shadcn", className)}
      {...props}
    >
      {/* Figma icons — shared .action-button__icon styles in action-button.css */}
      {iconLeft && <span className="action-button__icon action-button__icon--leading" aria-hidden />}
      <span className="action-button__label">{children}</span>
      {iconRight && <span className="action-button__icon action-button__icon--trailing" aria-hidden />}
    </Button>
  );
}
