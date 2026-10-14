/**
 * OVERVIEW PAGE (/design-system)
 *
 * Landing page for the design system docs. Explains:
 *   - How primitives, semantics, and components relate
 *   - The recommended learning order
 *   - Quick links to each section
 */
import Link from "next/link";

import {
  PageHeader,
  Section,
  StudentNote,
} from "@/components/design-system/page-layout";

export default function DesignSystemOverviewPage() {
  return (
    <>
      <PageHeader
        title="Design System"
        description="Welcome to your design system scaffold. Use the navigation to explore primitives, semantics, and components — then add your own tokens to bring it to life."
      />

      <Section
        title="How the layers relate"
        description="Two token layers, then components that consume them."
      >
        <div className="space-y-4 text-sm text-neutral-700">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="font-medium text-neutral-900">1. Primitives</p>
            <p className="mt-1">
              Raw, fixed values. The source of truth for color, spacing,
              typography, and more.
            </p>
            <code className="mt-2 block text-xs text-neutral-500">
              --color-brand-500: #3b82f6
            </code>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="font-medium text-neutral-900">2. Semantics</p>
            <p className="mt-1">
              Global tokens that give primitives meaning. Shared across the
              entire system — not tied to any single component.
            </p>
            <code className="mt-2 block text-xs text-neutral-500">
              --color-background-neutral-bold-default: var(--color-neutral-900)
            </code>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="font-medium text-neutral-900">3. Components</p>
            <p className="mt-1">
              UI elements that <em>reference</em> semantic tokens in their CSS.
              Components do not define their own token layer — they pick from
              the global semantic set.
            </p>
            <code className="mt-2 block text-xs text-neutral-500">
              background-color: var(--color-background-brand-bold-default)
            </code>
          </div>
        </div>
      </Section>

      <Section
        title="Getting started"
        description="Follow this order to build a cohesive token architecture."
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm text-neutral-700">
          <li>
            <strong className="text-neutral-900">Primitives</strong> — Define
            raw values in{" "}
            <code className="text-xs text-neutral-600">
              styles/tokens/primitives.css
            </code>
            .
          </li>
          <li>
            <strong className="text-neutral-900">Semantics</strong> — Map
            primitives to global roles using the naming pattern{" "}
            <code className="text-xs text-neutral-600">
              color-{"{role}"}-{"{intent}"}-{"{emphasis}"}-{"{state}"}
            </code>{" "}
            in{" "}
            <code className="text-xs text-neutral-600">
              styles/tokens/semantics.css
            </code>
            .
          </li>
          <li>
            <strong className="text-neutral-900">Components</strong> — Reference
            semantic tokens in raw component CSS (start with ActionButton).
          </li>
          <li>
            <strong className="text-neutral-900">ShadCN Components</strong> —
            Same tokens, built on shadcn/ui primitives (teach after Components).
          </li>
        </ol>
      </Section>

      <Section title="Explore">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Primitives",
              href: "/design-system/primitives",
              description: "Raw design values",
            },
            {
              title: "Semantics",
              href: "/design-system/semantics",
              description: "Global token roles",
            },
            {
              title: "Components",
              href: "/design-system/components",
              description: "Raw HTML components",
            },
            {
              title: "ShadCN Components",
              href: "/design-system/shadcn-components",
              description: "shadcn/ui components",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              <h3 className="font-medium text-neutral-900">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <StudentNote>
        There is no component-specific token layer. Semantic tokens like{" "}
        <code className="text-xs">
          --color-background-neutral-bold-default
        </code>{" "}
        are global — any component can use them. Your job is to define the
        primitive and semantic values, then see components pick them up.
      </StudentNote>
    </>
  );
}
