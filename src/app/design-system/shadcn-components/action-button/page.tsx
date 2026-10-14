/**
 * SHADCN ACTION BUTTON PAGE (/design-system/shadcn-components/action-button)
 *
 * Documents Approach 2: shadcn <Button variant="action"> + action-button-shadcn.css,
 * built to the same Figma "ActionButton" spec as the raw version.
 * Playground, variant grid and token tables are the same components the raw
 * page uses, pointed at ActionButtonShadcn.
 */
import Link from "next/link";

import {
  ActionButtonTokenTables,
  ActionButtonVariantGrid,
} from "@/components/design-system/action-button-docs";
import { ActionButtonPlayground } from "@/components/design-system/action-button-playground";
import { PageHeader, Section, StudentNote } from "@/components/design-system/page-layout";

const baseOverrides = [
  { shadcn: "h-9", figma: "36px", note: "Same height — kept" },
  { shadcn: "gap-2", figma: "--spacing-2", note: "Same value, now a token" },
  { shadcn: "px-4 py-2", figma: "--spacing-3 / --spacing-2", note: "Figma pads 12px inline" },
  { shadcn: "rounded-md", figma: "--border-radius-full", note: "Pill shape" },
  { shadcn: "text-sm", figma: "--font-size-sm + --font-line-height-sm", note: "Same 14 / 20" },
  { shadcn: "font-medium", figma: "--font-weight-semibold", note: "600 in Figma" },
  { shadcn: "focus-visible:ring-2", figma: "--color-border-neutral-bold-default", note: "Ring kept, colour from a token" },
];

export default function ActionButtonShadcnPage() {
  return (
    <>
      <PageHeader
        title="ActionButton"
        description="The shadcn/ui version — same Figma spec and semantic tokens as the raw button, built on the shadcn Button primitive with its base styles intact."
      />

      <Section
        title="Playground"
        description="Switch variant, appearance, state and label. Only combinations that exist in Figma can be selected."
      >
        <ActionButtonPlayground implementation="shadcn" />
      </Section>

      <Section title="All variants" description="Every variant in the Figma component set, rendered with ActionButtonShadcn.">
        <ActionButtonVariantGrid implementation="shadcn" />
      </Section>

      <Section
        title="Semantic tokens used"
        description="Identical to the raw ActionButton — both read the same token map."
      >
        <ActionButtonTokenTables />
      </Section>

      <Section
        title="shadcn base → tokens"
        description="The cva base classes in components/ui/button.tsx are untouched. action-button-shadcn.css swaps these values for Figma tokens."
      >
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="w-full min-w-[36rem] text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50 font-medium text-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">shadcn class</th>
                <th scope="col" className="px-4 py-2 font-medium">Figma token</th>
                <th scope="col" className="px-4 py-2 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {baseOverrides.map((row) => (
                <tr key={row.shadcn} className="border-b border-neutral-100 last:border-b-0">
                  <td className="px-4 py-2"><code className="text-neutral-800">{row.shadcn}</code></td>
                  <td className="px-4 py-2"><code className="text-neutral-800">{row.figma}</code></td>
                  <td className="px-4 py-2 text-neutral-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="What shadcn adds" description="The token mapping is identical to the raw version — shadcn changes the component layer.">
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>
            <strong className="text-neutral-900">cva</strong> — variant and size system via{" "}
            <code className="text-xs">buttonVariants</code>
          </li>
          <li>
            <strong className="text-neutral-900">Radix Slot</strong> — render as a child element with{" "}
            <code className="text-xs">asChild</code>
          </li>
          <li>
            <strong className="text-neutral-900">Focus & disabled</strong> — focus ring and{" "}
            <code className="text-xs">disabled:pointer-events-none</code> out of the box
          </li>
          <li>
            <strong className="text-neutral-900">action variant</strong> — an unstyled variant so token CSS
            controls all colours
          </li>
        </ul>
      </Section>

      <Section title="Files" description="The shadcn approach — Button primitive + token CSS.">
        <pre className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-700">
{`components/ui/button.tsx   →  shadcn Button primitive (unchanged)
action-button-shadcn.tsx   →  <Button variant="action" className="action-button-shadcn" data-variant data-appearance data-state>
action-button-shadcn.css   →  token values over the shadcn base + per-combination --ab-bg / --ab-text / --ab-border
action-button-spec.ts      →  Figma combinations + token map (shared with the raw button)`}
        </pre>
      </Section>

      <StudentNote>
        New to tokens? Start with the raw version in{" "}
        <Link href="/design-system/components/action-button" className="font-medium underline">
          Components → ActionButton
        </Link>{" "}
        first, then come back here.
      </StudentNote>
    </>
  );
}
