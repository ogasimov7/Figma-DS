/**
 * SEARCH
 *
 * Filters design system pages as you type.
 * Data comes from getSearchablePages() in lib/navigation.ts.
 *
 * Keyboard shortcuts:
 *   ↑ ↓  — move through results
 *   Enter — go to highlighted page
 *   Escape — close dropdown
 */
"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getSearchablePages } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const searchablePages = getSearchablePages();

export function DesignSystemSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Filter pages by label, parent group, or URL path */
  const results = query.trim()
    ? searchablePages.filter((page) => {
        const q = query.toLowerCase();
        return (
          page.label.toLowerCase().includes(q) ||
          page.group?.toLowerCase().includes(q) ||
          page.href.toLowerCase().includes(q)
        );
      })
    : [];

  /* Reset keyboard selection when query changes */
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function navigate(href: string) {
    setQuery("");
    setIsOpen(false);
    router.push(href);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      navigate(results[activeIndex].href);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search pages..."
          aria-label="Search design system pages"
          aria-autocomplete="list"
          aria-controls="search-results"
          className="h-9 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-200"
        />
      </div>

      {/* Results dropdown — only shown when there's a query */}
      {isOpen && query.trim() && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {results.length > 0 ? (
            results.map((result, index) => (
              <li key={result.href} role="option" aria-selected={index === activeIndex}>
                <Link
                  href={result.href}
                  onClick={() => {
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className={cn(
                    "block px-3 py-2 text-sm transition-colors",
                    index === activeIndex
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  <span className="font-medium">{result.label}</span>
                  {result.group && (
                    <span className="mt-0.5 block text-xs text-neutral-500">
                      {result.group}
                    </span>
                  )}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-neutral-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
