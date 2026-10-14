/**
 * SEMANTICS PAGE (/design-system/semantics)
 *
 * Documents Layer 2 of the token architecture.
 * Every token in src/styles/tokens/semantics.css is listed here
 * automatically — sections (roles), groups (intents) and aliases are read
 * from that file (see lib/tokens.ts), mirroring the primitives page.
 * Each row links to the primitive it aliases on /design-system/primitives.
 * Roles are split into sticky tabs (see components/design-system/token-tabs.tsx).
 *
 * Naming hierarchy:
 *   color / {role} / {intent} / {emphasis} / {state}
 * e.g. --color-background-neutral-bold-default
 */
import Link from "next/link";

import { PageHeader, Section, StudentNote } from "@/components/design-system/page-layout";
import { TokenTabs } from "@/components/design-system/token-tabs";
import { getPrimitiveValues, getSemanticSections, type Token } from "@/lib/tokens";

/** --color-{role}-{intent}-{emphasis}-{state} → its four parts */
function parseName(name: string) {
  const [role, intent, emphasis, state] = name.replace(/^--color-/, "").split("-");
  return { role, intent, emphasis, state };
}

/** Unique values in first-seen order */
function unique(values: string[]) {
  return [...new Set(values)];
}

export default function SemanticsPage() {
  const sections = getSemanticSections();
  const primitives = getPrimitiveValues();
  const parts = sections.flatMap((s) => s.groups.flatMap((g) => g.tokens.map((t) => parseName(t.name))));

  const hierarchy = [
    { label: "Roles", values: unique(parts.map((p) => p.role)) },
    { label: "Intents", values: unique(parts.map((p) => p.intent)) },
    { label: "Emphasis", values: unique(parts.map((p) => p.emphasis)) },
    { label: "States", values: unique(parts.map((p) => p.state)) },
  ];

  return (
    <>
      <PageHeader
        title="Semantics"
        description={`Semantic tokens are global and reusable. They map primitives to roles using a consistent naming hierarchy — not component names. ${parts.length} tokens, read live from semantics.css.`}
      />

      <Section title="Naming pattern" description="Every semantic color token follows this structure.">
        <div className="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700">
          <span className="text-neutral-400">color</span>
          {["role", "intent", "emphasis", "state"].map((part) => (
            <span key={part}>
              <span className="text-neutral-400"> / </span>
              <span className="font-medium text-blue-600">{`{${part}}`}</span>
            </span>
          ))}
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          {hierarchy.map(({ label, values }) => (
            <div key={label}>
              <dt className="font-medium text-neutral-900">{label}</dt>
              <dd className="text-neutral-600">{values.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-neutral-600">
          Example: <code className="text-xs">--color-background-neutral-bold-default</code>
        </p>
      </Section>

      <TokenTabs
        tabs={sections.map((section) => {
          const label = section.title.replace(/ colou?r$/i, "");
          return {
            id: label.toLowerCase(),
            label,
            count: section.groups.reduce((n, g) => n + g.tokens.length, 0),
            content: (
              <Section title={section.title} description={section.description}>
                <div className="flex flex-col gap-6">
                  {section.groups.map((group, i) => (
                    <div key={group.title ?? i}>
                      {group.title && (
                        <h3 className="mb-3 text-sm font-medium capitalize text-neutral-700">{group.title}</h3>
                      )}
                      <SemanticTable tokens={group.tokens} primitives={primitives} />
                    </div>
                  ))}
                </div>
              </Section>
            ),
          };
        })}
      />

      <StudentNote>
        Open <code className="text-xs">src/styles/tokens/semantics.css</code> and define tokens
        using the global naming pattern. Reference primitives with{" "}
        <code className="text-xs">var(--color-brightgreen-500)</code> — never hardcode hex values
        at this layer.
      </StudentNote>
    </>
  );
}

/* ── One intent: swatch / token / CSS variable / primitive / value ─ */

function SemanticTable({ tokens, primitives }: { tokens: Token[]; primitives: Map<string, string> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-500">
          <tr>
            <th scope="col" className="w-20 px-4 py-2 font-medium">Swatch</th>
            <th scope="col" className="px-4 py-2 font-medium">Token</th>
            <th scope="col" className="px-4 py-2 font-medium">CSS variable</th>
            <th scope="col" className="px-4 py-2 font-medium">Primitive</th>
            <th scope="col" className="px-4 py-2 font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => {
            const { role } = parseName(token.name);
            const alias = token.value.match(/^var\((--[\w-]+)\)$/)?.[1];
            const resolved = alias ? primitives.get(alias) : token.value;

            return (
              <tr key={token.name} className="border-b border-neutral-100 last:border-b-0">
                <td className="px-4 py-2">
                  <Swatch role={role} name={token.name} />
                </td>
                <td className="px-4 py-2">
                  {/* Figma variable path, e.g. color/background/brand/bold/default */}
                  <code className="text-xs text-neutral-800">{token.name.slice(2).replaceAll("-", "/")}</code>
                </td>
                <td className="px-4 py-2">
                  <code className="text-xs text-neutral-600">{token.name}</code>
                </td>
                <td className="px-4 py-2">
                  {alias ? (
                    <Link
                      href={`/design-system/primitives#${alias.slice(2)}`}
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline"
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-sm border border-neutral-300"
                        style={{ background: `var(${alias})` }}
                      />
                      <code>{alias}</code>
                    </Link>
                  ) : (
                    <span className="text-xs text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <code className="text-xs uppercase text-neutral-500">{resolved ?? token.value}</code>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Small preview matching how the role is used: fill, text, stroke or icon */
function Swatch({ role, name }: { role: string; name: string }) {
  const v = `var(${name})`;
  const box = "flex h-8 w-12 items-center justify-center rounded-md border border-neutral-200";

  if (role === "text")
    return (
      <div className={`${box} bg-white text-sm font-semibold`} style={{ color: v }}>
        Aa
      </div>
    );
  if (role === "border")
    return <div className="h-8 w-12 rounded-md border-2 bg-white" style={{ borderColor: v }} />;
  if (role === "icon")
    return (
      <div className={`${box} bg-white`} style={{ color: v }}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      </div>
    );

  return <div className={box} style={{ background: v }} />;
}
