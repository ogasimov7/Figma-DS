/**
 * TOKEN TABS
 *
 * Sticky tab bar for browsing token categories (e.g. the semantic roles).
 * Panels are rendered on the server and passed in; this component only
 * switches which one is visible. The active tab is mirrored to the URL
 * hash (#background, #text …) so a category can be linked to directly.
 *
 * Sticks just below the TopBar (h-14) while the page scrolls.
 */
"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TokenTab {
  id: string;
  label: string;
  count: number;
  content: ReactNode;
}

export function TokenTabs({ tabs }: { tabs: TokenTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Open the tab named in the URL hash, if any */
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (tabs.some((t) => t.id === fromHash)) setActive(fromHash);
  }, [tabs]);

  function select(id: string) {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    /* If the bar is already stuck, jump back so the new panel starts at the top */
    const bar = barRef.current;
    if (bar && bar.getBoundingClientRect().top <= 56) {
      bar.scrollIntoView({ block: "start" });
    }
  }

  /* Arrow / Home / End keys move between tabs (WAI-ARIA tabs pattern) */
  function onKeyDown(event: KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : undefined;
    if (next === undefined) return;
    event.preventDefault();
    select(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        ref={barRef}
        className="sticky top-14 z-30 -mx-4 mb-6 scroll-mt-14 border-b border-neutral-200 bg-neutral-50/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div role="tablist" aria-label="Token categories" className="flex gap-1 overflow-x-auto">
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "-mb-px flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors",
                  selected
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs",
                    selected ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
