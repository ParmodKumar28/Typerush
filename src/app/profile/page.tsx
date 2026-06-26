"use client";

const personalBest = [
    { label: "15 Seconds", value: 102, suffix: "WPM" },
    { label: "30 Seconds", value: 95, suffix: "WPM" },
    { label: "60 Seconds", value: 88, suffix: "WPM" },
    { label: "Avg Accuracy", value: 98.2, suffix: "%" },
];

const recentTests = [
    { date: "Today, 10:42", wpm: 102, accuracy: 99 },
    { date: "Yesterday", wpm: 95, accuracy: 98 },
    { date: "Yesterday", wpm: 98, accuracy: 100 },
    { date: "2 days ago", wpm: 90, accuracy: 94 },
    { date: "3 days ago", wpm: 92, accuracy: 97 },
];

const performanceBars = [52, 58, 54, 67, 62, 76, 71, 84, 79, 95];

export default function ProfilePage() {
    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--surface)] text-2xl font-bold text-[var(--foreground)]">
                        AR
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                            Alex Rivera
                        </h1>
                        <p className="text-sm text-[var(--muted)]">
                            alex.rivera@example.com
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-4">
                    <p className="text-xs tracking-widest text-[var(--muted)] uppercase">
                        Current Streak
                    </p>
                    <p className="mt-1 text-3xl font-bold text-[var(--accent)]">
                        12 Days
                    </p>
                </div>
            </div>

            <section className="flex flex-col gap-4">
                <p className="text-xs tracking-widest text-[var(--muted)] uppercase">
                    Personal Best
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {personalBest.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                        >
                            <p className="text-xs tracking-widest text-[var(--muted)] uppercase">
                                {item.label}
                            </p>
                            <div className="mt-4 flex items-end gap-2">
                                <span className="font-mono text-4xl font-bold text-[var(--foreground)]">
                                    {item.value}
                                </span>
                                <span className="mb-1 text-sm text-[var(--muted)]">
                                    {item.suffix}
                                </span>
                            </div>
                            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--background)]">
                                <div className="h-full w-[70%] rounded-full bg-[var(--accent)]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                    <p className="mb-6 text-xs tracking-widest text-[var(--muted)] uppercase">
                        Performance (Last 10 Tests)
                    </p>

                    <div className="flex h-72 items-end gap-4">
                        {performanceBars.map((value, index) => (
                            <div key={index} className="flex h-full flex-1 items-end">
                                <div
                                    className={`w-full rounded-t-md ${index === performanceBars.length - 1
                                            ? "bg-[var(--accent)]"
                                            : "bg-[var(--foreground)]/80"
                                        }`}
                                    style={{ height: `${value}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                    <p className="mb-4 text-xs tracking-widest text-[var(--muted)] uppercase">
                        Recent Tests
                    </p>

                    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                        <div className="grid grid-cols-3 border-b border-[var(--border)] px-4 py-3 text-xs tracking-widest text-[var(--muted)] uppercase">
                            <span>Date</span>
                            <span className="text-center">WPM</span>
                            <span className="text-right">Acc</span>
                        </div>

                        {recentTests.map((test, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 border-b border-[var(--border)] px-4 py-3 text-sm last:border-b-0"
                            >
                                <span className="text-[var(--muted)]">{test.date}</span>
                                <span className="text-center font-mono font-semibold text-[var(--accent)]">
                                    {test.wpm}
                                </span>
                                <span className="text-right font-mono text-[var(--foreground)]">
                                    {test.accuracy}%
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 rounded-full border border-red-300/30 px-4 py-2 text-sm text-red-400 transition-colors duration-200 hover:bg-red-500/10">
                        Logout
                    </button>
                </div>
            </section>
        </div>
    );
}
