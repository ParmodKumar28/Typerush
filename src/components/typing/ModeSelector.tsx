"use client";

import { useTypingStore } from "@/store/typingStore";
import { TimeMode, Difficulty } from "@/types";

const timeModes: TimeMode[] = [15, 30, 60, 120];
const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export default function ModeSelector() {
  const { timeMode, difficulty, setTimeMode, setDifficulty, status } =
    useTypingStore();

  const isDisabled = status === "running";

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Time Mode */}
      <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
        {timeModes.map((mode) => (
          <button
            key={mode}
            disabled={isDisabled}
            onClick={() => setTimeMode(mode)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              timeMode === mode
                ? "bg-[var(--accent)] font-semibold text-black"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            } ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
          >
            {mode}s
          </button>
        ))}
      </div>

      {/* Difficulty */}
      <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
        {difficulties.map((diff) => (
          <button
            key={diff}
            disabled={isDisabled}
            onClick={() => setDifficulty(diff)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200 ${
              difficulty === diff
                ? "bg-[var(--accent)] font-semibold text-black"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            } ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );
}
