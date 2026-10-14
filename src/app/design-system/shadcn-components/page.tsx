/**
 * SHADCN COMPONENTS PAGE (/design-system/shadcn-components)
 *
 * Index of shadcn/ui components (Approach 2).
 * Same semantic tokens as raw components — different React foundation.
 * Teach this section AFTER raw Components.
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
    href: "/design-system/shadcn-components/action-button",
    description:
      "shadcn/ui Button primitive with the Figma ActionButton tokens applied over its base styles — plus the same live playground.",
  },
];

export default function ShadcnComponentsPage() {
  return (
    <>
      <PageHeader
        title="ShadCN Components"
        description="The same components built on shadcn/ui primitives. Teach this after the raw Components section — same tokens, different foundation."
      />

      <Section
        title="Raw vs shadcn"
        description="Both sections consume identical semantic tokens."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm">
            <p className="font-medium text-neutral-900">Components</p>
            <p className="mt-1 text-neutral-600">
              Plain HTML elements + CSS. Best for learning tokens.
            </p>
            <Link
              href="/design-system/components"
              className="mt-2 inline-block text-sm text-neutral-900 underline"
            >
              Go to Components →
            </Link>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm">
            <p className="font-medium text-neutral-900">ShadCN Components</p>
            <p className="mt-1 text-neutral-600">
              shadcn/ui primitives + token CSS. Best for production patterns.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Available components"
        description="Select a component to view its shadcn/ui implementation."
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
        shadcn provides the React layer (cva, Radix Slot, focus handling).
        Colors still come from your semantic tokens — not shadcn defaults.
      </StudentNote>
    </>
  );
}
