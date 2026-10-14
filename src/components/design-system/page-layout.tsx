/**
 * PAGE LAYOUT COMPONENTS
 *
 * Reusable building blocks for documentation pages.
 * Every /design-system/* page uses these to stay consistent.
 *
 * Components:
 *   PageHeader      — page title + description
 *   Section         — grouped content with heading
 *   TokenPreview    — placeholder box for a token (students fill in values)
 *   StudentNote     — yellow callout with instructions
 *   ComponentPreview — bordered box to render a live component
 *
 * Styled with Tailwind — these are doc site UI, not design token components.
 */
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
}

/** Top of every docs page — title and short intro */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
        {description}
      </p>
    </header>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Groups related content under a heading */
export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn("mb-10", className)}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-neutral-600">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

interface TokenPreviewProps {
  label: string;
  tokenName?: string;
}

/**
 * Empty preview card for a single token.
 * Students will eventually show the token's value here (e.g. a colour swatch).
 * The dashed border signals "this is a placeholder — fill it in".
 */
export function TokenPreview({ label, tokenName }: TokenPreviewProps) {
  const showTokenName = tokenName && tokenName !== label;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4">
      <code className="text-sm font-medium text-neutral-700">
        {tokenName ?? label}
      </code>
      {showTokenName && (
        <span className="text-xs text-neutral-500">{label}</span>
      )}
      {/* Preview area — students can wire this to show the actual token value */}
      <div
        className="h-12 w-full rounded-md border border-neutral-200 bg-white"
        aria-label={`Preview area for ${label}`}
      />
    </div>
  );
}

interface StudentNoteProps {
  children: ReactNode;
}

/** Yellow callout box with guidance for students */
export function StudentNote({ children }: StudentNoteProps) {
  return (
    <aside className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="mb-1 font-medium">Note for students</p>
      <div className="text-amber-800">{children}</div>
    </aside>
  );
}

interface ComponentPreviewProps {
  title?: string;
  children: ReactNode;
}

/** Bordered box to render a live component (e.g. ActionButton) */
export function ComponentPreview({ title = "Preview", children }: ComponentPreviewProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {title}
        </span>
      </div>
      <div className="flex min-h-32 items-center justify-center p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
