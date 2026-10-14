/**
 * UTILITIES
 *
 * cn() is a shadcn/ui helper that safely merges Tailwind class names.
 * Used throughout the doc site layout (sidebar, page sections, etc.).
 *
 * Note: design system COMPONENTS use CSS variables for colors,
 * not Tailwind utilities — cn() is for the documentation shell only.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
