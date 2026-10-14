/**
 * RAW ACTION BUTTON PAGE (/design-system/components/action-button)
 *
 * Documents Approach 1: plain HTML <button> + action-button.css, built to
 * match the Figma "ActionButton" component set (node 35:40).
 *
 * Sections:
 *   Playground     — switch every Figma property live (action-button-playground.tsx)
 *   All variants   — the full Figma grid: combination × state
 *   Semantic tokens — per-state token map from action-button-spec.ts
 * Grid and token tables are shared with the shadcn page (action-button-docs.tsx).
 */
import Link from "next/link";

import {
  ActionButtonTokenTables,
  ActionButtonVariantGrid,
} from "@/components/design-system/action-button-docs";
import { ActionButtonPlayground } from "@/components/design-system/action-button-playground";
import { PageHeader, Section, StudentNote } from "@/components/design-system/page-layout";

export default function ActionButtonPage() {
  return (
    <>
      <PageHeader
        title="ActionButton"
        description="A plain HTML button styled through global semantic tokens, built 1:1 from the Figma ActionButton component set — 4 variants, 3 appearances, 3 states plus disabled, and optional icons."
      />

      <Section
        title="Playground"
        description="Switch variant, appearance, state and label. Only combinations that exist in Figma can be selected."
      >
        <ActionButtonPlayground />
      </Section>

      <Section title="All variants" description="Every variant in the Figma component set, in the same layout.">
        <ActionButtonVariantGrid />
      </Section>

      <Section
        title="Semantic tokens used"
        description="Colour tokens per combination and state, as bound in Figma. Empty cells mean no fill or stroke."
      >
        <ActionButtonTokenTables />
      </Section>

      <Section title="Files" description="The raw approach — no component library, just HTML + CSS.">
        <pre className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-700">
{`action-button.tsx      →  <button class="action-button" data-variant data-appearance data-state>
action-button.css      →  per-combination --ab-bg / --ab-text / --ab-border from semantic tokens
action-button-spec.ts  →  Figma combinations + token map (playground + this page)
public/icons/          →  icon-leading.svg, icon-trailing.svg (exported from Figma)`}
        </pre>
      </Section>

      <StudentNote>
        Once you understand this flow, see the same button built with shadcn/ui in{" "}
        <Link href="/design-system/shadcn-components/action-button" className="font-medium underline">
          ShadCN Components → ActionButton
        </Link>
        .
      </StudentNote>
    </>
  );
}
