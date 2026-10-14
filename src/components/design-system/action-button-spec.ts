/**
 * ACTION BUTTON SPEC
 *
 * The Figma "ActionButton" component set (node 35:40) as data: which
 * variant/appearance combinations exist and which semantic tokens each
 * state uses. Documentation and the playground read from here; the
 * actual styling lives in action-button.css — keep the two in sync.
 */

export const actionButtonVariants = ["primary", "secondary", "tertiary", "danger"] as const;
export const actionButtonAppearances = ["filled", "outline", "link"] as const;
export const actionButtonStates = ["default", "hover", "pressed"] as const;

export type ActionButtonVariant = (typeof actionButtonVariants)[number];
export type ActionButtonAppearance = (typeof actionButtonAppearances)[number];
export type ActionButtonState = (typeof actionButtonStates)[number];

/** Appearances each variant ships with in Figma (first = default) */
export const appearancesByVariant: Record<ActionButtonVariant, readonly ActionButtonAppearance[]> = {
  primary: ["filled"],
  secondary: ["filled"],
  tertiary: ["filled", "outline", "link"],
  danger: ["outline"],
};

export interface ActionButtonTokenSet {
  background?: string;
  text: string;
  border?: string;
}

type StateKey = ActionButtonState | "disabled";

/** Semantic tokens per combination and state, exactly as bound in Figma */
export const actionButtonTokens: Record<string, Record<StateKey, ActionButtonTokenSet>> = {
  "primary/filled": {
    default: { background: "--color-background-brand-bold-default", text: "--color-text-neutral-bold-default" },
    hover: { background: "--color-background-brand-bold-hovered", text: "--color-text-neutral-bold-default" },
    pressed: { background: "--color-background-brand-bold-pressed", text: "--color-text-neutral-bold-default" },
    disabled: { background: "--color-background-brand-bold-disabled", text: "--color-text-neutral-bold-disabled" },
  },
  "secondary/filled": {
    default: { background: "--color-background-brand-subtlest-default", text: "--color-text-neutral-bold-default" },
    hover: { background: "--color-background-brand-subtlest-hovered", text: "--color-text-neutral-bold-default" },
    pressed: { background: "--color-background-brand-subtlest-pressed", text: "--color-text-neutral-bold-default" },
    disabled: { background: "--color-background-brand-subtlest-disabled", text: "--color-text-neutral-bold-disabled" },
  },
  "tertiary/filled": {
    default: { background: "--color-background-neutral-subtle-default", text: "--color-text-neutral-bold-default" },
    hover: { background: "--color-background-neutral-subtle-hovered", text: "--color-text-neutral-bold-default" },
    pressed: { background: "--color-background-neutral-subtle-pressed", text: "--color-text-neutral-bold-default" },
    disabled: { background: "--color-background-neutral-subtle-disabled", text: "--color-text-neutral-bold-disabled" },
  },
  "tertiary/outline": {
    default: { text: "--color-text-neutral-bold-default", border: "--color-border-neutral-subtlest-default" },
    hover: {
      background: "--color-background-neutral-subtlest-hovered",
      text: "--color-text-neutral-bold-default",
      border: "--color-border-neutral-subtlest-hovered",
    },
    pressed: {
      background: "--color-background-neutral-subtlest-pressed",
      text: "--color-text-neutral-bold-default",
      border: "--color-border-neutral-subtlest-hovered",
    },
    disabled: {
      background: "--color-background-neutral-subtlest-disabled",
      text: "--color-text-neutral-bold-disabled",
      border: "--color-border-neutral-subtlest-disabled",
    },
  },
  "tertiary/link": {
    default: { text: "--color-text-neutral-bold-default" },
    hover: { text: "--color-text-neutral-bold-default" },
    pressed: { background: "--color-background-neutral-subtlest-pressed", text: "--color-text-neutral-bold-default" },
    disabled: { background: "--color-background-neutral-subtlest-disabled", text: "--color-text-neutral-bold-disabled" },
  },
  "danger/outline": {
    default: { text: "--color-text-danger-subtlest-default", border: "--color-border-danger-subtle-default" },
    hover: { text: "--color-text-danger-subtlest-hovered", border: "--color-border-danger-subtle-hovered" },
    pressed: { text: "--color-text-danger-subtlest-pressed", border: "--color-border-danger-subtle-pressed" },
    disabled: { text: "--color-text-danger-subtlest-disabled", border: "--color-border-danger-subtle-disabled" },
  },
};

/** Tokens shared by every variant */
export const actionButtonSharedTokens = [
  { property: "Height", token: "36px (fixed in Figma)" },
  { property: "Padding (block)", token: "--spacing-2" },
  { property: "Padding (inline)", token: "--spacing-3" },
  { property: "Gap", token: "--spacing-2" },
  { property: "Radius", token: "--border-radius-full" },
  { property: "Border width (outline)", token: "--border-width-1" },
  { property: "Font family", token: "--font-family-sans" },
  { property: "Font size", token: "--font-size-sm" },
  { property: "Line height", token: "--font-line-height-sm" },
  { property: "Font weight", token: "--font-weight-semibold" },
  { property: "Icon size", token: "--sizing-4" },
] as const;
