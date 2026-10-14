/**
 * COMPONENTS PAGE (/design-system/components)
 *
 * Index of raw HTML components (Approach 1).
 * These consume global semantic tokens directly in their CSS files.
 * Teach this section BEFORE ShadCN Components.
 */
import Link from "next/link";

import {
  PageHeader,
  Section,
  StudentNote,
} from "@/components/design-system/page-layout";

const components = [
  {
    name: "ActionButton",
    href: "/design-system/components/action-button",
    description:
      "A plain HTML button built 1:1 from the Figma component set — variants, appearances, states, icons and a live playground.",
  },
];

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        description="Raw HTML components styled by referencing global semantic tokens in CSS. No component library — the simplest way to learn the token flow."
      />

      <Section
        title="How components use tokens"
        description="Components pick from the global semantic set — they don't define their own."
      >
        <div className="space-y-3 text-sm text-neutral-700">
          <p>
            Choose semantic tokens that match the component&apos;s role. A
            primary button might use <code className="text-xs">brand / bold</code>{" "}
            tokens, while a subtle surface might use{" "}
            <code className="text-xs">neutral / subtlest</code>.
          </p>
          <p>
            The mapping lives in the component&apos;s CSS file — not in a
            separate tokens file.
          </p>
        </div>
      </Section>

      <Section
        title="Available components"
        description="Select a component to view its documentation and preview."
      >
        <div className="grid gap-4">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div>
                <h3 className="font-medium text-neutral-900">
                  {component.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {component.description}
                </p>
              </div>
              <span className="text-sm text-neutral-400" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <StudentNote>
        Once you understand raw components, see the shadcn/ui versions in{" "}
        <Link
          href="/design-system/shadcn-components"
          className="font-medium underline"
        >
          ShadCN Components
        </Link>
        .
      </StudentNote>
    </>
  );
}
