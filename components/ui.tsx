import type { Tone } from "@/lib/audit-data";

const TONE_TEXT: Record<Tone, string> = {
  danger: "text-red-800",
  warning: "text-amber-800",
  info: "text-sky-800",
  success: "text-emerald-800",
  neutral: "text-zinc-700",
};

const TONE_BORDER: Record<Tone, string> = {
  danger: "border-l-red-700",
  warning: "border-l-amber-600",
  info: "border-l-sky-700",
  success: "border-l-emerald-700",
  neutral: "border-l-zinc-400",
};

const TONE_ROW: Record<Tone, string> = {
  danger: "bg-red-50/80",
  warning: "bg-amber-50/80",
  info: "bg-sky-50/70",
  success: "bg-emerald-50/80",
  neutral: "bg-transparent",
};

export function Stat({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone?: Tone;
}) {
  return (
    <div className="border border-zinc-200 bg-white px-4 py-3">
      <div
        className={`text-2xl font-semibold tracking-tight ${tone ? TONE_TEXT[tone] : "text-ink"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs leading-snug text-zinc-500">{label}</div>
    </div>
  );
}

export function Callout({
  tone,
  title,
  children,
}: {
  tone: Tone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border border-zinc-200 border-l-4 bg-white px-4 py-3 ${TONE_BORDER[tone]}`}
    >
      <div className={`text-sm font-semibold ${TONE_TEXT[tone]}`}>{title}</div>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{children}</p>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
  rowTone,
  sticky,
}: {
  headers: string[];
  rows: string[][];
  rowTone?: Tone[];
  sticky?: boolean;
}) {
  return (
    <div className="overflow-x-auto border border-zinc-200 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
            {headers.map((h) => (
              <th
                key={h}
                className={`border-b border-zinc-200 px-3 py-2 font-medium ${sticky ? "sticky top-0 bg-zinc-50" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-zinc-100 last:border-0 ${rowTone?.[i] ? TONE_ROW[rowTone[i]] : ""}`}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-2 align-top leading-snug text-zinc-700 ${j === 0 ? "font-medium text-ink" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-relaxed text-zinc-500">{children}</p>;
}
