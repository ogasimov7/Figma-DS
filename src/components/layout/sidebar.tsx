/**
 * SIDEBAR NAVIGATION
 *
 * Left nav links for the design system docs.
 * Reads from lib/navigation.ts — add pages there, not here.
 *
 * Props:
 *   onNavigate — called when a link is clicked (closes mobile menu)
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavActive, navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4" aria-label="Design system navigation">
      {navigation.map((item) => (
        <div key={item.href}>
          {/* Top-level link — highlighted when active */}
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isNavActive(pathname, item.href)
                ? "bg-neutral-900 text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            )}
          >
            {item.label}
          </Link>

          {/* Nested child links — indented with a left border */}
          {item.children && (
            <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-neutral-200 pl-3">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors",
                    pathname === child.href
                      ? "font-medium text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
