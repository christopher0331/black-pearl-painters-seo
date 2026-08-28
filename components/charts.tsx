"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const INK = "#12202e";
const GRID = "#e4e4e7";
const INFO = "#0369a1";
const WARN = "#b45309";
const DANGER = "#b91c1c";
const SUCCESS = "#15803d";
const MUTED = "#71717a";

export function VerticalBar({
  categories,
  values,
  name,
  height = 200,
  yMax,
}: {
  categories: string[];
  values: number[];
  name: string;
  height?: number;
  yMax?: number;
}) {
  const data = categories.map((category, i) => ({ category, value: values[i] }));
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="category" tick={{ fill: MUTED, fontSize: 12 }} />
          <YAxis
            domain={[0, yMax ?? "auto"]}
            tick={{ fill: MUTED, fontSize: 12 }}
          />
          <Tooltip />
          <Bar dataKey="value" name={name} fill={INFO} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HorizontalBar({
  categories,
  values,
  name,
  height = 240,
  yMax,
}: {
  categories: string[];
  values: number[];
  name: string;
  height?: number;
  yMax?: number;
}) {
  const data = categories.map((category, i) => ({ category, value: values[i] }));
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis
            type="number"
            domain={[0, yMax ?? "auto"]}
            tick={{ fill: MUTED, fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={110}
            tick={{ fill: INK, fontSize: 12 }}
          />
          <Tooltip />
          <Bar dataKey="value" name={name} fill={INFO} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DualLine({
  categories,
  series,
  height = 240,
  yMax = 100,
}: {
  categories: string[];
  series: Array<{ name: string; data: number[]; color: string }>;
  height?: number;
  yMax?: number;
}) {
  const data = categories.map((category, i) => {
    const point: Record<string, string | number> = { category };
    series.forEach((s) => {
      point[s.name] = s.data[i];
    });
    return point;
  });
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={GRID} />
          <XAxis dataKey="category" tick={{ fill: MUTED, fontSize: 11 }} />
          <YAxis domain={[0, yMax]} tick={{ fill: MUTED, fontSize: 12 }} />
          <Tooltip />
          <Legend />
          {series.map((s) => (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              fill={s.color}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Donut({
  slices,
  height = 220,
}: {
  slices: Array<{ label: string; value: number; color: string }>;
  height?: number;
}) {
  const data = slices.map((s) => ({ name: s.label, value: s.value }));
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={52}
            outerRadius={80}
            paddingAngle={2}
          >
            {slices.map((s) => (
              <Cell key={s.label} fill={s.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const chartColors = { INFO, WARN, DANGER, SUCCESS, MUTED, INK };
