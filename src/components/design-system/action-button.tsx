/**
 * APPROACH 1: RAW BUTTON
 *
 * Teach this first. A plain HTML <button> styled via action-button.css.
 * Props mirror the Figma "ActionButton" component set 1:1:
 *   variant, appearance, state, disabled, size, iconLeft, iconRight, label (children)
 *
 * Files in this approach:
 *   action-button.tsx       →  React component (structure only)
 *   action-button.css       →  All styling via global semantic tokens
 *   action-button-spec.ts   →  Figma combinations + token map (docs/playground)
 *
 * Token flow:
 *   primitives.css → semantics.css → action-button.css → this component
 *
 * For the shadcn/ui version, see action-button-shadcn.tsx
 */
import * as React from "react";

import type {
  ActionButtonAppearance,
  ActionButtonState,
  ActionButtonVariant,
} from "@/components/design-system/action-button-spec";
import { cn } from "@/lib/utils";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionButtonVariant;
  /** Must be one Figma ships for the variant — see appearancesByVariant */
  appearance?: ActionButtonAppearance;
  /**
   * Pins the visual state (docs and playgrounds). Leave unset in product
   * code so the button reacts to real hover and press.
   */
  state?: ActionButtonState;
  size?: "md";
  iconLeft?: boolean;
  iconRight?: boolean;
  children: React.ReactNode;
}

export function ActionButton({
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
}: ActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      /* Figma only has disabled in the default state */
      data-state={disabled ? undefined : state}
      className={cn("action-button", className)}
      {...props}
    >
      {iconLeft && <span className="action-button__icon action-button__icon--leading" aria-hidden />}
      <span className="action-button__label">{children}</span>
      {iconRight && <span className="action-button__icon action-button__icon--trailing" aria-hidden />}
    </button>
  );
}
