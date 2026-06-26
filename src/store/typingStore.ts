import { create } from "zustand";
import {
    TimeMode,
    Difficulty,
    TestStatus,
    WordState,
    TestResult,
} from "@/types";
import { generateWords } from "@/utils/generateWords";
import { calculateWpm, calculateAccuracy } from "@/utils/calculateWpm";

type LastInputStatus = "idle" | "correct" | "wrong";

interface TypingStore {
    timeMode: TimeMode;
    difficulty: Difficulty;
    soundEnabled: boolean;

    status: TestStatus;
    words: WordState[];
    currentWordIndex: number;
    currentCharIndex: number;
    timeLeft: number;

    wpm: number;
    accuracy: number;
    mistakes: number;
    correctChars: number;
    totalTypedChars: number;
    wpmTimeline: number[];

    result: TestResult | null;
    lastInputStatus: LastInputStatus;

    setTimeMode: (mode: TimeMode) => void;
    setDifficulty: (diff: Difficulty) => void;
    setSoundEnabled: (enabled: boolean) => void;
    startTest: () => void;
    initializeTest: () => void;
    resetTest: () => void;
    finishTest: () => void;
    handleInput: (key: string) => void;
    tickTimer: () => void;
    recordWpmSnapshot: () => void;
}

export const useTypingStore = create<TypingStore>((set, get) => ({
    timeMode: 30,
    difficulty: "medium",
    soundEnabled: true,

    status: "idle",
    words: [],
    currentWordIndex: 0,
    currentCharIndex: 0,
    timeLeft: 30,

    wpm: 0,
    accuracy: 100,
    mistakes: 0,
    correctChars: 0,
    totalTypedChars: 0,
    wpmTimeline: [],

    result: null,
    lastInputStatus: "idle",

    setTimeMode: (mode) => {
        set({ timeMode: mode });
        get().resetTest();
    },

    setDifficulty: (diff) => {
        set({ difficulty: diff });
        get().resetTest();
    },

    setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

    initializeTest: () => {
        const { difficulty, timeMode } = get();

        set({
            words: generateWords(difficulty),
            currentWordIndex: 0,
            currentCharIndex: 0,
            timeLeft: timeMode,
            wpm: 0,
            accuracy: 100,
            mistakes: 0,
            correctChars: 0,
            totalTypedChars: 0,
            wpmTimeline: [],
            result: null,
            lastInputStatus: "idle",
            status: "idle",
        });
    },

    resetTest: () => {
        get().initializeTest();
    },

    startTest: () => {
        const { words } = get();
        if (!words.length) return;
        set({ status: "running" });
    },

    finishTest: () => {
        const { wpm, accuracy, mistakes, timeMode, difficulty, wpmTimeline } = get();

        const result: TestResult = {
            wpm,
            accuracy,
            mistakes,
            timeMode,
            difficulty,
            timestamp: Date.now(),
            wpmTimeline,
        };

        set({
            status: "finished",
            result,
            lastInputStatus: "idle",
        });
    },

    tickTimer: () => {
        const { timeLeft, status } = get();
        if (status !== "running") return;

        if (timeLeft <= 1) {
            get().finishTest();
            return;
        }

        set({ timeLeft: timeLeft - 1 });
        get().recordWpmSnapshot();
    },

    recordWpmSnapshot: () => {
        const { correctChars, timeMode, timeLeft, wpmTimeline, status } = get();
        if (status !== "running") return;

        const elapsed = Math.max(1, timeMode - timeLeft + 1);
        const currentWpm = calculateWpm(correctChars, elapsed);

        set({
            wpmTimeline: [...wpmTimeline, currentWpm],
        });
    },

    handleInput: (key: string) => {
        const {
            status,
            words,
            currentWordIndex,
            currentCharIndex,
            mistakes,
            correctChars,
            totalTypedChars,
            timeMode,
            timeLeft,
        } = get();

        if (!words.length) return;
        if (status === "finished") return;
        if (status === "idle") get().startTest();

        const currentWord = words[currentWordIndex];
        if (!currentWord) return;

        if (key === "Backspace") {
            if (currentCharIndex > 0) {
                const newWords = [...words];
                const prevCharIndex = currentCharIndex - 1;
                newWords[currentWordIndex].chars[prevCharIndex].status = "pending";

                set({
                    words: newWords,
                    currentCharIndex: prevCharIndex,
                    lastInputStatus: "idle",
                });
            }
            return;
        }

        if (key === " ") {
            if (currentCharIndex === 0) return;

            set({
                currentWordIndex: currentWordIndex + 1,
                currentCharIndex: 0,
                lastInputStatus: "idle",
            });
            return;
        }

        if (key.length !== 1) return;

        const expectedChar = currentWord.chars[currentCharIndex];
        if (!expectedChar) return;

        const isCorrect = key === expectedChar.char;
        const newWords = [...words];

        newWords[currentWordIndex].chars[currentCharIndex].status = isCorrect
            ? "correct"
            : "wrong";

        const newMistakes = isCorrect ? mistakes : mistakes + 1;
        const newCorrectChars = isCorrect ? correctChars + 1 : correctChars;
        const newTotalChars = totalTypedChars + 1;

        const elapsed = Math.max(1, timeMode - timeLeft);
        const newWpm = calculateWpm(newCorrectChars, elapsed);
        const newAccuracy = calculateAccuracy(newTotalChars, newMistakes);

        set({
            words: newWords,
            currentCharIndex: currentCharIndex + 1,
            mistakes: newMistakes,
            correctChars: newCorrectChars,
            totalTypedChars: newTotalChars,
            wpm: newWpm,
            accuracy: newAccuracy,
            lastInputStatus: isCorrect ? "correct" : "wrong",
        });
    },
}));