"use client";

const leaderboardData = [
  { rank: 1, name: "AlphaZero", wpm: 184, accuracy: 99.8, time: "3h ago" },
  { rank: 2, name: "JDoe_Codes", wpm: 172, accuracy: 98.5, time: "5h ago" },
  { rank: 3, name: "NeoKey", wpm: 165, accuracy: 100, time: "1d ago" },
  { rank: 4, name: "TypeSpeed", wpm: 158, accuracy: 97.2, time: "2d ago" },
  { rank: 5, name: "QwertyMaster", wpm: 155, accuracy: 96.8, time: "3d ago" },
];

const filters = [15, 30, 60] as const;

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 flex flex-col items-center gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
          Global <span className="text-[var(--accent)]">Leaderboard</span>
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Top typists around the world.
        </p>

        <div className="mt-3 flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
          {filters.map((item) => (
            <button
              key={item}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                item === 15
                  ? "bg-[var(--accent)] font-semibold text-black"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {item}s
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="grid grid-cols-5 border-b border-[var(--border)] px-6 py-4 text-xs tracking-widest text-[var(--muted)] uppercase">
          <span>Rank</span>
          <span>User</span>
          <span className="text-center">WPM</span>
          <span className="text-center">Accuracy</span>
          <span className="text-right">Date</span>
        </div>

        {leaderboardData.map((user) => (
          <div
            key={user.rank}
            className="grid grid-cols-5 items-center border-b border-[var(--border)] px-6 py-5 transition-colors duration-200 last:border-b-0 hover:bg-[color:color-mix(in_srgb,var(--surface)_88%,var(--accent)_12%)]"
          >
            <span
              className={`font-semibold ${
                user.rank === 1
                  ? "text-yellow-400"
                  : user.rank === 2
                    ? "text-zinc-300"
                    : user.rank === 3
                      ? "text-orange-400"
                      : "text-[var(--muted)]"
              }`}
            >
              #{user.rank}
            </span>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-xs font-bold text-[var(--foreground)]">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium text-[var(--foreground)]">
                {user.name}
              </span>
            </div>

            <span className="text-center font-mono text-lg font-bold text-[var(--accent)]">
              {user.wpm}
            </span>

            <span className="text-center font-mono text-[var(--foreground)]">
              {user.accuracy}%
            </span>

            <span className="text-right text-sm text-[var(--muted)]">
              {user.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
