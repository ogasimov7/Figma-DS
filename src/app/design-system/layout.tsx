/**
 * DESIGN SYSTEM LAYOUT
 *
 * Shared shell for every /design-system/* page.
 * Delegates to DesignSystemShell which provides:
 *   - Top bar (title + search)
 *   - Left sidebar navigation
 *   - Centered content area (max-width 1080px)
 *
 * Individual page content is passed as {children}.
 */
import { DesignSystemShell } from "@/components/layout/design-system-shell";

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DesignSystemShell>{children}</DesignSystemShell>;
}
