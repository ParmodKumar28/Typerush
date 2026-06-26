"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeMode } from "@/types";

interface Props {
  data: number[];
  timeMode: TimeMode;
}

export default function WpmGraph({ data, timeMode }: Props) {
  const chartData = data.map((wpm, index) => ({
    second: `${index + 1}s`,
    wpm,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          vertical={false}
        />
        <XAxis
          dataKey="second"
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={Math.floor(timeMode / 6)}
        />
        <YAxis
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--foreground)",
            fontSize: "12px",
          }}
          formatter={(value: number) => [`${value} WPM`, "Speed"]}
        />
        <Area
          type="monotone"
          dataKey="wpm"
          stroke="var(--accent)"
          strokeWidth={2}
          fill="url(#wpmGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "var(--accent)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
