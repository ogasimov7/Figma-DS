/**
 * DESIGN SYSTEM SHELL
 *
 * The app frame around all documentation pages. Provides:
 *   - TopBar (sticky header with search + mobile menu button)
 *   - Sidebar (desktop: always visible, mobile: slide-in overlay)
 *   - Main content area (centered, max 1080px)
 *
 * This is "doc site" UI — styled with Tailwind, not design tokens.
 * Student design system work lives in the {children} content area.
 */
"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

interface DesignSystemShellProps {
  children: React.ReactNode;
}

export function DesignSystemShell({ children }: DesignSystemShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /* Prevent background scrolling when mobile nav is open */
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <TopBar
        mobileNavOpen={mobileNavOpen}
        onMobileNavToggle={() => setMobileNavOpen((open) => !open)}
      />

      <div className="flex flex-1">
        {/* Desktop sidebar — hidden on mobile (md:block) */}
        <aside className="hidden w-56 shrink-0 border-r border-neutral-200 bg-white md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar — overlay with backdrop, only shown when menu is open */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-neutral-900/40"
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
            />
            <aside className="relative h-full w-72 max-w-[85vw] border-r border-neutral-200 bg-white shadow-xl">
              <Sidebar onNavigate={() => setMobileNavOpen(false)} />
            </aside>
          </div>
        )}

        {/* Page content — responsive padding, capped at 1080px.
            overflow-x-clip (not overflow-auto) so sticky elements inside pages follow the window scroll */}
        <main className="flex min-w-0 flex-1 justify-center overflow-x-clip p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-[1080px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
