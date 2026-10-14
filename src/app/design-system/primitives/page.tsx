/**
 * PRIMITIVES PAGE (/design-system/primitives)
 *
 * Documents Layer 1 of the token architecture.
 * Every token in src/styles/tokens/primitives.css is listed here
 * automatically — sections, groups and values are read from that file
 * (see lib/tokens.ts). Previews use var(--token), so they show
 * exactly what the browser resolves. Each token has an id (its name
 * without the leading --) so the semantics page can link to it.
 */
import type { CSSProperties } from "react";

import { PageHeader, Section } from "@/components/design-system/page-layout";
import {
  getPrimitiveSections,
  type Token,
} from "@/lib/tokens";

/** "0.875rem" → "14px" so Figma values are easy to cross-check */
function pxHint(value: string) {
  const match = value.match(/^(-?[\d.]+)rem$/);
  return match ? `${parseFloat(match[1]) * 16}px` : undefined;
}

export default function PrimitivesPage() {
  const sections = getPrimitiveSections();
  const total = sections.reduce(
    (sum, s) => sum + s.groups.reduce((n, g) => n + g.tokens.length, 0),
    0
  );

  return (
    <>
      <PageHeader
        title="ORK's primitives"
        description={`Primitive tokens are the raw building blocks of your design system. They hold fixed values that don't change based on context. ${total} tokens, read live from primitives.css.`}
      />

      {sections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          description={section.description}
        >
          <div className="flex flex-col gap-6">
            {section.groups.map((group, i) => (
              <div key={group.title ?? i}>
                {group.title && (
                  <h3 className="mb-3 text-sm font-medium capitalize text-neutral-700">
                    {group.title}
                  </h3>
                )}
                {group.tokens.every((t) => t.name.startsWith("--color-")) ? (
                  <ColorGrid tokens={group.tokens} />
                ) : (
                  <TokenTable tokens={group.tokens} />
                )}
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

/* ── Colours: swatch cards ─────────────────────────────────────────── */

function ColorGrid({ tokens }: { tokens: Token[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tokens.map((token) => (
        <div
          key={token.name}
          id={token.name.slice(2)}
          className="min-w-0 scroll-mt-20 overflow-hidden rounded-lg border border-neutral-200 bg-white target:ring-2 target:ring-blue-500"
        >
          <div
            className="h-16 border-b border-neutral-200"
            style={{ background: `var(${token.name})` }}
          />
          <div className="flex flex-col gap-0.5 p-2.5">
            <code className="truncate text-xs font-medium text-neutral-800" title={token.name}>
              {token.name}
            </code>
            <code className="text-xs uppercase text-neutral-500">{token.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Everything else: name / value / preview rows ──────────────────── */

function TokenTable({ tokens }: { tokens: Token[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {tokens.map((token) => {
        const hint = pxHint(token.value);
        return (
          <div
            key={token.name}
            id={token.name.slice(2)}
            className="grid scroll-mt-20 grid-cols-1 items-center gap-2 border-b border-neutral-100 px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,14rem)_minmax(0,10rem)_1fr] sm:gap-4"
          >
            <code className="min-w-0 truncate text-sm font-medium text-neutral-800" title={token.name}>
              {token.name}
            </code>
            <code className="text-sm text-neutral-600">
              {token.value}
              {hint && <span className="ml-1.5 text-neutral-400">{hint}</span>}
            </code>
            <div className="min-w-0">
              <TokenSample name={token.name} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Picks a preview based on the token's name prefix */
function TokenSample({ name }: { name: string }) {
  const v = `var(${name})`;
  const box = "border border-neutral-300 bg-neutral-100";

  if (name.startsWith("--font-family-"))
    return <Sample style={{ fontFamily: v }}>The quick brown fox — 0123</Sample>;
  if (name.startsWith("--font-weight-"))
    return <Sample style={{ fontWeight: v }}>The quick brown fox</Sample>;
  if (name.startsWith("--font-size-"))
    return <Sample style={{ fontSize: v, lineHeight: 1.1 }}>Aa</Sample>;
  if (name.startsWith("--font-line-height-"))
    return (
      <p
        className="max-w-xs border-l-2 border-neutral-300 pl-2 text-sm text-neutral-700"
        style={{ lineHeight: v }}
      >
        Two lines of text show
        <br />
        the line height.
      </p>
    );
  if (name.startsWith("--spacing-"))
    return <div className="h-3 rounded-sm bg-neutral-400" style={{ width: v }} />;
  if (name.startsWith("--sizing-"))
    return <div className={box} style={{ width: v, height: v }} />;
  if (name.startsWith("--border-radius-"))
    return <div className={`h-12 w-12 ${box}`} style={{ borderRadius: v }} />;
  if (name.startsWith("--border-width-"))
    return (
      <div
        className="h-10 w-16 border-solid border-neutral-800 bg-white"
        style={{ borderWidth: v }}
      />
    );
  if (name.startsWith("--opacity-"))
    return <div className="h-10 w-16 rounded-md bg-neutral-900" style={{ opacity: v }} />;

  return null;
}

function Sample({ style, children }: { style: CSSProperties; children: React.ReactNode }) {
  return (
    <span className="block truncate text-neutral-900" style={style}>
      {children}
    </span>
  );
}
