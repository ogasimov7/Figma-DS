/**
 * ACTION BUTTON PLAYGROUND
 *
 * Interactive sandbox for the ActionButton. Controls map 1:1 to the Figma
 * component properties (variant, appearance, state, disabled, iconLeft,
 * iconRight, label). Appearances Figma doesn't ship for a variant are
 * disabled, so every combination you can pick exists in the design.
 *
 * Shows the live button, the semantic tokens it's using right now, and
 * the JSX to copy. Pass implementation="shadcn" to drive
 * ActionButtonShadcn instead of the raw ActionButton — everything else
 * is identical.
 */
"use client";

import { useState, type ReactNode } from "react";

import { ActionButton } from "@/components/design-system/action-button";
import { ActionButtonShadcn } from "@/components/design-system/action-button-shadcn";
import {
  actionButtonAppearances,
  actionButtonStates,
  actionButtonTokens,
  actionButtonVariants,
  appearancesByVariant,
  type ActionButtonAppearance,
  type ActionButtonState,
  type ActionButtonVariant,
} from "@/components/design-system/action-button-spec";
import { cn } from "@/lib/utils";

type PreviewState = ActionButtonState | "live";

const DEFAULTS = {
  label: "Label",
  variant: "primary" as ActionButtonVariant,
  appearance: "filled" as ActionButtonAppearance,
  state: "live" as PreviewState,
  disabled: false,
  iconLeft: false,
  iconRight: false,
};

const implementations = {
  raw: { Component: ActionButton, name: "ActionButton" },
  shadcn: { Component: ActionButtonShadcn, name: "ActionButtonShadcn" },
};

export function ActionButtonPlayground({ implementation = "raw" }: { implementation?: keyof typeof implementations }) {
  const { Component, name } = implementations[implementation];
  const [label, setLabel] = useState(DEFAULTS.label);
  const [variant, setVariant] = useState(DEFAULTS.variant);
  const [appearance, setAppearance] = useState(DEFAULTS.appearance);
  const [state, setState] = useState(DEFAULTS.state);
  const [disabled, setDisabled] = useState(DEFAULTS.disabled);
  const [iconLeft, setIconLeft] = useState(DEFAULTS.iconLeft);
  const [iconRight, setIconRight] = useState(DEFAULTS.iconRight);
  const [copied, setCopied] = useState(false);

  const allowed = appearancesByVariant[variant];

  function changeVariant(next: ActionButtonVariant) {
    setVariant(next);
    /* Snap to an appearance Figma ships for this variant */
    if (!appearancesByVariant[next].includes(appearance)) setAppearance(appearancesByVariant[next][0]);
  }

  function reset() {
    setLabel(DEFAULTS.label);
    setVariant(DEFAULTS.variant);
    setAppearance(DEFAULTS.appearance);
    setState(DEFAULTS.state);
    setDisabled(DEFAULTS.disabled);
    setIconLeft(DEFAULTS.iconLeft);
    setIconRight(DEFAULTS.iconRight);
  }

  const tokenState = disabled ? "disabled" : state === "live" ? "default" : state;
  const tokens = actionButtonTokens[`${variant}/${appearance}`][tokenState];
  const text = label.trim() || "Label";

  const code = [
    `<${name}`,
    `  variant="${variant}"`,
    `  appearance="${appearance}"`,
    !disabled && state !== "live" && `  state="${state}"`,
    disabled && "  disabled",
    iconLeft && "  iconLeft",
    iconRight && "  iconRight",
    ">",
    `  ${text}`,
    `</${name}>`,
  ]
    .filter(Boolean)
    .join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — the code is still selectable */
    }
  }

  return (
    <div className="grid overflow-hidden rounded-lg border border-neutral-200 bg-white lg:grid-cols-[minmax(0,1fr)_18rem]">
      {/* ── Preview + output ─────────────────────────────────────── */}
      <div className="flex min-w-0 flex-col border-b border-neutral-200 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Preview</span>
          <span className="text-xs text-neutral-400">
            {state === "live" && !disabled ? "Hover and press the button" : `Pinned to ${tokenState}`}
          </span>
        </div>

        <div className="flex min-h-48 flex-1 items-center justify-center p-8">
          <Component
            variant={variant}
            appearance={appearance}
            state={state === "live" ? undefined : state}
            disabled={disabled}
            iconLeft={iconLeft}
            iconRight={iconRight}
          >
            {text}
          </Component>
        </div>

        <div className="border-t border-neutral-200 px-4 py-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Tokens · {variant} / {appearance} / {tokenState}
          </p>
          <dl className="grid gap-1.5 text-xs">
            {(["background", "text", "border"] as const).map((slot) => (
              <div key={slot} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-2">
                <dt className="capitalize text-neutral-500">{slot}</dt>
                <dd className="flex min-w-0 items-center gap-2">
                  {tokens[slot] ? (
                    <>
                      <span
                        className="h-3.5 w-3.5 shrink-0 rounded-sm border border-neutral-300"
                        style={{ background: `var(${tokens[slot]})` }}
                      />
                      <code className="truncate text-neutral-800">{tokens[slot]}</code>
                    </>
                  ) : (
                    <span className="text-neutral-400">none</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative border-t border-neutral-200 bg-neutral-50">
          <pre className="overflow-x-auto p-4 pr-20 text-xs text-neutral-700">{code}</pre>
          <button
            type="button"
            onClick={copy}
            className="absolute top-3 right-3 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* ── Controls ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 p-4">
        <Control label="Label" htmlFor="ab-label">
          <input
            id="ab-label"
            value={label}
            maxLength={40}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-500"
          />
        </Control>

        <Control label="Variant">
          <Segmented options={actionButtonVariants} value={variant} onChange={changeVariant} columns={2} />
        </Control>

        <Control label="Appearance">
          <Segmented
            options={actionButtonAppearances}
            value={appearance}
            onChange={setAppearance}
            isDisabled={(a) => !allowed.includes(a)}
          />
          <p className="mt-1.5 text-xs text-neutral-500">
            {variant} ships as {allowed.join(", ")} in Figma.
          </p>
        </Control>

        <Control label="State">
          <Segmented
            options={["live", ...actionButtonStates] as const}
            value={disabled ? "default" : state}
            onChange={setState}
            isDisabled={() => disabled}
          />
          {disabled && (
            <p className="mt-1.5 text-xs text-neutral-500">Disabled only exists in the default state in Figma.</p>
          )}
        </Control>

        <div className="flex flex-col gap-3">
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
          <Toggle label="Leading icon" checked={iconLeft} onChange={setIconLeft} />
          <Toggle label="Trailing icon" checked={iconRight} onChange={setIconRight} />
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-auto self-start text-xs font-medium text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline"
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}

/* ── Control primitives (doc-site UI, Tailwind) ───────────────────── */

function Control({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  isDisabled,
  columns = options.length,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  isDisabled?: (value: T) => boolean;
  columns?: number;
}) {
  return (
    <div
      className="grid gap-1 rounded-md bg-neutral-100 p-1"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const selected = option === value;
        const off = isDisabled?.(option) ?? false;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            disabled={off}
            onClick={() => onChange(option)}
            className={cn(
              "rounded px-2 py-1.5 text-xs font-medium capitalize transition-colors",
              selected ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900",
              off && "cursor-not-allowed opacity-40 hover:text-neutral-600"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-neutral-800">
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? "bg-neutral-900" : "bg-neutral-300"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4"
          )}
        />
      </button>
    </label>
  );
}
