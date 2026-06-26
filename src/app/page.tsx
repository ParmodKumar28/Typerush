"use client";

import { useEffect, useRef } from "react";
import { useTypingStore } from "@/store/typingStore";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import ModeSelector from "@/components/typing/ModeSelector";
import StatsBar from "@/components/typing/StatsBar";
import WordDisplay from "@/components/typing/WordDisplay";
import RestartButton from "@/components/typing/RestartButton";
import ResultsScreen from "@/components/results/ResultsScreen";

export default function HomePage() {
  const status = useTypingStore((state) => state.status);
  const words = useTypingStore((state) => state.words);
  const initializeTest = useTypingStore((state) => state.initializeTest);

  const { handleReset } = useTypingEngine();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      initializeTest();
      hasInitializedRef.current = true;
    }
  }, [initializeTest]);

  if (status === "finished") {
    return <ResultsScreen onRetry={handleReset} />;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-12">
      <ModeSelector />
      <StatsBar />

      <div className="w-full">
        {words.length ? (
          <WordDisplay />
        ) : (
          <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
            Loading words...
          </div>
        )}
      </div>

      <RestartButton />
    </div>
  );
}
