/**
 * TOKEN READER
 *
 * Reads the token CSS files on the server and turns them into data the
 * primitives and semantics pages can render. The CSS files stay the single
 * source of truth — add or change a token there and the pages follow.
 *
 * Structure it understands (shared by primitives.css and semantics.css):
 *   /* ── Section title ───   → a new section
 *    * Description line         → that section's description
 *   /* group *\/                → a sub-group inside the section (e.g. a colour family)
 *   --token-name: value;        → a token
 *
 * Server-only: uses node:fs, so import it from server components only.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

export interface Token {
  name: string; /* full custom property name, e.g. --color-grey-800 */
  value: string; /* raw value as written in the CSS, e.g. #1c1e19 or var(--color-grey-800) */
}

export interface TokenGroup {
  title?: string; /* sub-group label, e.g. "grey" — absent for ungrouped tokens */
  tokens: Token[];
}

export interface TokenSection {
  title: string;
  description?: string;
  groups: TokenGroup[];
}

const TOKENS_DIR = path.join(process.cwd(), "src/styles/tokens");

const SECTION_RE = /^\/\*\s*──\s*(.+?)\s*─/;
const DESCRIPTION_RE = /^\*\s+(.+)$/;
const GROUP_RE = /^\/\*\s*([\w-]+)\s*\*\/$/;
const TOKEN_RE = /^(--[\w-]+)\s*:\s*(.+?)\s*;/;

function readTokenSections(file: string): TokenSection[] {
  const css = readFileSync(path.join(TOKENS_DIR, file), "utf8");
  const body = css.slice(css.indexOf(":root"));

  const sections: TokenSection[] = [];
  let section: TokenSection | undefined;
  let inSectionHeader = false;

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();

    const sectionMatch = line.match(SECTION_RE);
    if (sectionMatch) {
      section = {
        title: sectionMatch[1].replace(/ (primitives|semantics)$/i, ""),
        groups: [],
      };
      sections.push(section);
      inSectionHeader = true;
      continue;
    }

    if (inSectionHeader) {
      const descriptionMatch = line.match(DESCRIPTION_RE);
      if (descriptionMatch && section && !section.description) {
        section.description = descriptionMatch[1];
      }
      if (line.endsWith("*/")) inSectionHeader = false;
      continue;
    }

    if (!section) continue;

    const groupMatch = line.match(GROUP_RE);
    if (groupMatch) {
      section.groups.push({ title: groupMatch[1], tokens: [] });
      continue;
    }

    const tokenMatch = line.match(TOKEN_RE);
    if (tokenMatch) {
      if (section.groups.length === 0) section.groups.push({ tokens: [] });
      section.groups.at(-1)!.tokens.push({ name: tokenMatch[1], value: tokenMatch[2] });
    }
  }

  return sections.filter((s) => s.groups.some((g) => g.tokens.length > 0));
}

export function getPrimitiveSections(): TokenSection[] {
  return readTokenSections("primitives.css");
}

export function getSemanticSections(): TokenSection[] {
  return readTokenSections("semantics.css");
}

/** Every primitive as name → raw value, for resolving semantic aliases */
export function getPrimitiveValues(): Map<string, string> {
  return new Map(
    getPrimitiveSections().flatMap((s) =>
      s.groups.flatMap((g) => g.tokens.map((t) => [t.name, t.value] as const))
    )
  );
}
