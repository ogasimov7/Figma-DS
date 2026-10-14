/**
 * ACTION BUTTON DOCS
 *
 * Reference sections shared by the raw and shadcn ActionButton pages, so
 * both document the same Figma spec in the same layout:
 *   ActionButtonVariantGrid  — every Figma variant: combination × state
 *   ActionButtonTokenTables  — semantic tokens per combination and state
 *
 * Data comes from action-button-spec.ts.
 */
import { ActionButton } from "@/components/design-system/action-button";
import { ActionButtonShadcn } from "@/components/design-system/action-button-shadcn";
import {
  actionButtonSharedTokens,
  actionButtonStates,
  actionButtonTokens,
  appearancesByVariant,
  type ActionButtonAppearance,
  type ActionButtonVariant,
} from "@/components/design-system/action-button-spec";

/** Figma column order: primary, secondary, tertiary (filled, outline, link), danger */
const combinations = (Object.entries(appearancesByVariant) as [ActionButtonVariant, readonly ActionButtonAppearance[]][]).flatMap(
  ([variant, appearances]) => appearances.map((appearance) => ({ variant, appearance }))
);

const rows = [
  ...actionButtonStates.map((state) => ({ label: state, state, disabled: false })),
  { label: "disabled", state: undefined, disabled: true },
];

const implementations = { raw: ActionButton, shadcn: ActionButtonShadcn };

export function ActionButtonVariantGrid({ implementation = "raw" }: { implementation?: keyof typeof implementations }) {
  const Component = implementations[implementation];
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <table className="w-full min-w-[40rem] text-left">
        <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-500">
          <tr>
            <th scope="col" className="px-4 py-2 font-medium">State</th>
            {combinations.map(({ variant, appearance }) => (
              <th key={`${variant}/${appearance}`} scope="col" className="px-2 py-2 text-center font-medium">
                {variant}
                <span className="block font-normal text-neutral-400">{appearance}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-neutral-100 last:border-b-0">
              <th scope="row" className="px-4 py-4 text-xs font-medium capitalize text-neutral-500">
                {row.label}
              </th>
              {combinations.map(({ variant, appearance }) => (
                <td key={`${variant}/${appearance}`} className="px-2 py-4 text-center">
                  <Component variant={variant} appearance={appearance} state={row.state} disabled={row.disabled}>
                    Label
                  </Component>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ActionButtonTokenTables() {
  return (
    <div className="flex flex-col gap-6">
      {combinations.map(({ variant, appearance }) => {
        const key = `${variant}/${appearance}` as const;
        return (
          <div key={key}>
            <h3 className="mb-3 text-sm font-medium text-neutral-700">
              {variant} / {appearance}
            </h3>
            <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
              <table className="w-full min-w-[44rem] text-left text-xs">
                <thead className="border-b border-neutral-200 bg-neutral-50 font-medium text-neutral-500">
                  <tr>
                    <th scope="col" className="w-24 px-4 py-2 font-medium">State</th>
                    <th scope="col" className="px-4 py-2 font-medium">Background</th>
                    <th scope="col" className="px-4 py-2 font-medium">Text</th>
                    <th scope="col" className="px-4 py-2 font-medium">Border</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(actionButtonTokens[key]).map(([state, tokens]) => (
                    <tr key={state} className="border-b border-neutral-100 last:border-b-0">
                      <th scope="row" className="px-4 py-2 font-medium capitalize text-neutral-500">{state}</th>
                      <TokenCell token={tokens.background} />
                      <TokenCell token={tokens.text} />
                      <TokenCell token={tokens.border} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <div>
        <h3 className="mb-3 text-sm font-medium text-neutral-700">Shared by every variant</h3>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white text-xs">
          {actionButtonSharedTokens.map(({ property, token }) => (
            <div
              key={property}
              className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 border-b border-neutral-100 px-4 py-2 last:border-b-0"
            >
              <span className="text-neutral-500">{property}</span>
              <code className="text-neutral-800">{token}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TokenCell({ token }: { token?: string }) {
  return (
    <td className="px-4 py-2">
    {token ? (
      <span className="inline-flex items-center gap-2">
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-sm border border-neutral-300"
          style={{ background: `var(${token})` }}
        />
        <code className="whitespace-nowrap text-neutral-800">{token}</code>
      </span>
    ) : (
      <span className="text-neutral-300">—</span>
    )}
    </td>
  );
}
