"use client";

import Link from "next/link";
import { IconKeyboard } from "@tabler/icons-react";

const footerLinks = [
  { label: "Settings", href: "/settings" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-border mt-5xl w-full border-t">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Left — copyright */}
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <IconKeyboard size={14} />
          <span>© {new Date().getFullYear()} TypeRush</span>
        </div>

        {/* Right — links */}
        <div className="flex items-center gap-5">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
