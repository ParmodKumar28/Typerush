"use client";

import { IconRefresh } from "@tabler/icons-react";
import { useTypingStore } from "@/store/typingStore";

export default function RestartButton() {
  const { resetTest } = useTypingStore();

  return (
    <button
      onClick={resetTest}
      className="group flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:text-[var(--foreground)]"
    >
      <IconRefresh
        size={16}
        className="transition-transform duration-300 group-hover:rotate-180"
      />
      Restart
    </button>
  );
}
