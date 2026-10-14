/**
 * TOP BAR
 *
 * Sticky header shown on every design system page. Contains:
 *   - Mobile menu button (hamburger — only visible below md breakpoint)
 *   - Site title
 *   - Search input (filters pages from lib/navigation.ts)
 *
 * Styled with Tailwind — this is doc site chrome, not a design token component.
 */
"use client";

import { Menu, X } from "lucide-react";

import { DesignSystemSearch } from "@/components/layout/search";

interface TopBarProps {
  mobileNavOpen: boolean;
  onMobileNavToggle: () => void;
}

export function TopBar({ mobileNavOpen, onMobileNavToggle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4 sm:gap-4 sm:px-6">
      {/* Hamburger — toggles mobile sidebar (hidden on desktop) */}
      <button
        type="button"
        onClick={onMobileNavToggle}
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 md:hidden"
        aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileNavOpen}
      >
        {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm font-semibold text-neutral-900 sm:text-base">
          Memorisely Design System
        </span>
        <span className="hidden rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 sm:inline">
          Scaffold
        </span>
      </div>

      {/* Search — pushed to the right, filters all nav pages */}
      <div className="ml-auto w-full max-w-xs sm:max-w-sm">
        <DesignSystemSearch />
      </div>
    </header>
  );
}
