/**
 * NAVIGATION CONFIG
 *
 * Single source of truth for sidebar links and search results.
 * When you add a new page, add it here — the sidebar and search
 * will pick it up automatically.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[]; /* nested items shown indented in the sidebar */
}

/* Sidebar structure — mirrors the design system hierarchy */
export const navigation: NavItem[] = [
  { label: "Overview", href: "/design-system" },
  { label: "Primitives", href: "/design-system/primitives" },
  { label: "Semantics", href: "/design-system/semantics" },
  {
    label: "Components",
    href: "/design-system/components",
    children: [
      {
        label: "ActionButton",
        href: "/design-system/components/action-button",
      },
    ],
  },
  {
    label: "ShadCN Components",
    href: "/design-system/shadcn-components",
    children: [
      {
        label: "ActionButton",
        href: "/design-system/shadcn-components/action-button",
      },
    ],
  },
];

export interface SearchablePage {
  label: string;
  href: string;
  group?: string; /* parent section name, e.g. "Components" */
}

/** Flatten the nested nav into a list the search bar can filter */
export function getSearchablePages(items: NavItem[] = navigation): SearchablePage[] {
  const pages: SearchablePage[] = [];

  for (const item of items) {
    pages.push({ label: item.label, href: item.href });

    if (item.children) {
      for (const child of item.children) {
        pages.push({
          label: child.label,
          href: child.href,
          group: item.label,
        });
      }
    }
  }

  return pages;
}

/** Highlight the active sidebar link based on the current URL */
export function isNavActive(pathname: string, href: string) {
  if (href === "/design-system") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
