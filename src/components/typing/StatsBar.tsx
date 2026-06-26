"use client";

import { useTypingStore } from "@/store/typingStore";

interface StatItemProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

function StatItem({ label, value, highlight }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
        {label}
      </span>
      <span
        className={`font-mono text-3xl font-bold tabular-nums transition-all duration-300 ${
          highlight ? "text-[var(--accent)]" : "text-[var(--foreground)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const { wpm, accuracy, timeLeft, mistakes, status } = useTypingStore();

  return (
    <div className="flex items-center justify-center gap-10 py-4">
      <StatItem label="WPM" value={wpm} highlight={wpm > 0} />
      <div className="h-10 w-px bg-[var(--border)]" />
      <StatItem label="Accuracy" value={`${accuracy}%`} />
      <div className="h-10 w-px bg-[var(--border)]" />
      <StatItem
        label="Time"
        value={`${timeLeft}s`}
        highlight={status === "running" && timeLeft <= 5}
      />
      <div className="h-10 w-px bg-[var(--border)]" />
      <StatItem label="Mistakes" value={mistakes} highlight={mistakes > 0} />
    </div>
  );
}
