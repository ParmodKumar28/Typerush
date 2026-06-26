"use client";

import { useRef, useEffect } from "react";
import { useTypingStore } from "@/store/typingStore";

export default function WordDisplay() {
  const { words, currentWordIndex, currentCharIndex, status } =
    useTypingStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);

  // Auto scroll to current word
  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeWord = activeWordRef.current;
      const wordTop = activeWord.offsetTop;
      const containerHeight = container.clientHeight;

      if (wordTop > containerHeight / 2) {
        container.scrollTop = wordTop - containerHeight / 2;
      }
    }
  }, [currentWordIndex]);

  return (
    <div
      className="w-full cursor-text rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8"
      onClick={() => window.focus()}
    >
      {/* Words Container */}
      <div
        ref={containerRef}
        className="relative h-[140px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          {words.map((wordState, wordIndex) => {
            const isCurrentWord = wordIndex === currentWordIndex;
            const isPastWord = wordIndex < currentWordIndex;

            return (
              <div
                key={wordIndex}
                ref={isCurrentWord ? activeWordRef : null}
                className="relative flex"
              >
                {wordState.chars.map((charState, charIndex) => {
                  const isCurrentChar =
                    isCurrentWord && charIndex === currentCharIndex;

                  return (
                    <span
                      key={charIndex}
                      className={`relative font-mono text-xl leading-relaxed transition-colors duration-100 ${
                        charState.status === "correct"
                          ? "text-[var(--correct)]"
                          : charState.status === "wrong"
                            ? "text-[var(--wrong)]"
                            : isPastWord
                              ? "text-[var(--wrong)]" // skipped chars = wrong
                              : "text-[var(--pending)]"
                      } `}
                    >
                      {/* Blinking cursor */}
                      {isCurrentChar && status !== "finished" && (
                        <span className="animate-blink absolute top-0.5 -left-0.5 h-5 w-0.5 rounded-full bg-[var(--accent)]" />
                      )}
                      {charState.char}
                    </span>
                  );
                })}

                {/* Cursor at end of word (after last char) */}
                {isCurrentWord &&
                  currentCharIndex === wordState.chars.length &&
                  status !== "finished" && (
                    <span className="relative">
                      <span className="animate-blink absolute top-0.5 -left-0.5 h-5 w-0.5 rounded-full bg-[var(--accent)]" />
                    </span>
                  )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint text when idle */}
      {status === "idle" && (
        <p className="mt-4 text-center text-xs tracking-wide text-[var(--muted)]">
          Start typing to begin the test...
        </p>
      )}
    </div>
  );
}
