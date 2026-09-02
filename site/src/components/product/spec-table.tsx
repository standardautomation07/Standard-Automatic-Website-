import type { Specification } from "@/lib/types";

/**
 * Renders only rows with real data - no "N/A" filler for UNKNOWN fields, per
 * planning/CONTENT-MODEL.md and planning/DESIGN-SYSTEM.md §5.
 */
export function SpecTable({ specifications }: { specifications: Specification[] }) {
  if (!specifications.length) return null;

  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {specifications.map((spec, i) => (
            <tr key={i} className="border-b border-border last:border-0 odd:bg-surface-raised even:bg-surface-sunken/40">
              <th
                scope="row"
                className="w-2/5 px-4 py-2.5 text-left font-mono text-xs font-medium uppercase tracking-wide text-ink-muted"
              >
                {spec.label}
              </th>
              <td className="px-4 py-2.5 font-mono [font-variant-numeric:tabular-nums]">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
