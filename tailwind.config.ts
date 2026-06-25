import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand
                accent: {
                    DEFAULT: "#00ff88",
                    dark: "#00ff88",
                    light: "#059669",
                },
                // Dark theme
                dark: {
                    bg: "#0d0d0d",
                    surface: "#1a1a1a",
                    border: "#2a2a2a",
                    text: "#ffffff",
                    muted: "#444444",
                },
                // Light theme
                light: {
                    bg: "#f5f5f5",
                    surface: "#ffffff",
                    border: "#e5e5e5",
                    text: "#111111",
                    muted: "#9ca3af",
                },
                // Typing colors
                correct: "#00ff88",
                wrong: "#ff4444",
                pending: "#444444",
            },
            fontFamily: {
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
                sans: ["Inter", "Geist", "sans-serif"],
            },
            animation: {
                blink: "blink 1s step-end infinite",
            },
            keyframes: {
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
        }
    },
    plugins: []
}