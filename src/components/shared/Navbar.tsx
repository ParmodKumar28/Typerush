"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconKeyboard,
    IconSun,
    IconMoon,
    IconCode,
} from "@tabler/icons-react";

const navLinks = [
    { label: "Play", href: "/" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Profile", href: "/profile" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    return (
        <nav className="w-full border-b border-[var(--border)] bg-[var(--background)]">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <IconKeyboard
                        size={22}
                        className="text-[var(--accent)] group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="font-bold text-lg tracking-tight text-[var(--foreground)]">
                        Type<span className="text-[var(--accent)]">Rush</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors duration-200 hover:text-[var(--accent)] ${pathname === link.href
                                ? "text-[var(--accent)]"
                                : "text-[var(--muted)]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all duration-200"
                        aria-label="Toggle theme"
                    >
                        {mounted ? (
                            theme === "dark" ? (
                                <IconSun size={18} />
                            ) : (
                                <IconMoon size={18} />
                            )
                        ) : (
                            <IconMoon size={18} />
                        )}
                    </button>

                    {/* GitHub */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all duration-200"
                        aria-label="GitHub"
                    >
                        <IconCode size={18} />
                    </a>
                </div>

            </div>
        </nav>
    );
}