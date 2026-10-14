# Memorisely Design System Scaffold

A starter project for students building their own design system with Next.js, TypeScript, Tailwind CSS, and shadcn/ui conventions.

## Getting started

```bash
npm install
npm run dev
```

**If styles disappear** (unstyled page), stop the dev server and run:

```bash
npm run clean
npm run dev
```

Do not run `npm run build` while `npm run dev` is active — it corrupts the cache.

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/design-system`.

## Project structure

```
src/
├── app/design-system/          # Documentation pages
├── components/
│   ├── design-system/          # Design system components (ActionButton)
│   └── layout/                 # Shell layout (sidebar, top bar)
├── lib/utils.ts                # shadcn/ui utility (cn)
└── styles/tokens/
    ├── primitives.css          # Raw token values (students add these)
    └── semantics.css           # Global semantic token roles
```

## Token architecture

### 1. Primitives
Raw, fixed values — colors, spacing, typography, radii.

```css
--color-brand-500: #3b82f6;
--color-neutral-900: #171717;
```

### 2. Semantics
Global tokens that give primitives meaning. **Not component-specific.**

Naming pattern: `color-{role}-{intent}-{emphasis}-{state}`

| Part | Values |
|---|---|
| Role | `background`, `text`, `border`, `icon` |
| Intent | `neutral`, `brand`, `info`, `success`, `warning` |
| Emphasis | `subtlest`, `subtle`, `bold` |
| State | `default`, `hovered`, `pressed`, `disabled` |

Example: `--color-background-neutral-bold-default`

### 3. Components
UI elements that **reference semantic tokens directly** in their CSS files. There is no separate component token layer.

```css
/* action-button.css */
background-color: var(--color-background-brand-bold-default);
```

## Pages

| Route | Description |
|---|---|
| `/design-system` | Overview and layer relationships |
| `/design-system/primitives` | Primitive token documentation |
| `/design-system/semantics` | Global semantic token hierarchy |
| `/design-system/components` | Raw components (start here) |
| `/design-system/components/action-button` | Raw ActionButton docs and preview |
| `/design-system/shadcn-components` | shadcn/ui components |
| `/design-system/shadcn-components/action-button` | shadcn ActionButton docs and preview |

## Your task

1. Add values to `src/styles/tokens/primitives.css`
2. Map them to global semantics in `src/styles/tokens/semantics.css`
3. See components like ActionButton pick up those tokens automatically
