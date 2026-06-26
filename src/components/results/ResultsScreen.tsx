"use client";

import { useTypingStore } from "@/store/typingStore";
import { IconRefresh, IconChartBar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import WpmGraph from "./WpmGraph";

interface Props {
  onRetry: () => void;
}

function getMotivationalMessage(wpm: number): string {
  if (wpm >= 120) return "Legendary! You're a typing god! 🏆";
  if (wpm >= 100) return "Outstanding! Top 1% typist! 🔥";
  if (wpm >= 80) return "Excellent! Way above average! ⚡";
  if (wpm >= 60) return "Great job! Keep practicing! 💪";
  if (wpm >= 40) return "Good effort! You're improving! 📈";
  return "Keep practicing — you'll get there! 🎯";
}

export default function ResultsScreen({ onRetry }: Props) {
  const { result } = useTypingStore();

  if (!result) return null;

  const { wpm, accuracy, mistakes, timeMode, wpmTimeline } = result;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* WPM — Big Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:col-span-2"
        >
          <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
            Typing Speed
          </span>
          <div className="flex items-end gap-2">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="font-mono text-8xl leading-none font-bold text-[var(--accent)]"
            >
              {wpm}
            </motion.span>
            <span className="mb-2 text-2xl text-[var(--muted)]">WPM</span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            {getMotivationalMessage(wpm)}
          </p>
        </motion.div>

        {/* Right Stats */}
        <div className="flex flex-col gap-4">
          {/* Accuracy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-1 flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
              Accuracy
            </span>
            <span className="font-mono text-4xl font-bold text-[var(--foreground)]">
              {accuracy}
              <span className="text-xl text-[var(--muted)]">%</span>
            </span>
          </motion.div>

          {/* Mistakes + Time */}
          <div className="flex flex-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-1 flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                Mistakes
              </span>
              <span className="font-mono text-3xl font-bold text-[var(--foreground)]">
                {mistakes}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-1 flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                Time
              </span>
              <span className="font-mono text-3xl font-bold text-[var(--foreground)]">
                {timeMode}
                <span className="text-lg text-[var(--muted)]">s</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WPM Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <span className="mb-4 block text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
          Performance Timeline
        </span>
        <WpmGraph data={wpmTimeline} timeMode={timeMode} />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex items-center justify-center gap-4"
      >
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-black transition-all duration-200 hover:opacity-90"
        >
          <IconRefresh size={16} />
          Try Again
        </button>

        <Link
          href="/leaderboard"
          className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-3 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <IconChartBar size={16} />
          View Leaderboard
        </Link>
      </motion.div>
    </div>
  );
}
