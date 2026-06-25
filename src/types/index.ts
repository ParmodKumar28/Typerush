export type TimeMode = 15 | 30 | 60 | 120;
export type Difficulty = "easy" | "medium" | "hard";
export type Theme = "dark" | "light";


export interface CharState {
    char: string;
    status: "pending" | "correct" | "wrong";
}

export interface WordState {
    word: string;
    chars: CharState[];
}

export interface TestResult {
    wpm: number;
    accuracy: number;
    mistakes: number;
    timeMode: TimeMode;
    difficulty: Difficulty;
    timestamp: number;
    wpmTimeline: number[]; // WPM per second
}

export interface TypingStore {
    // Config
    timeMode: TimeMode;
    difficulty: Difficulty;
    setTimeMode: (mode: TimeMode) => void;
    setDifficulty: (difficulty: Difficulty) => void;

    // Test state
    words: WordState[];
    currentWordIndex: number;
    currentCharindex: number;
    isStarted: boolean;
    isFinished: boolean;
    timeLeft: number;

    // Stats
    wpm: number;
    accuracy: number;
    mistakes: number;
    wpmTimeline: number[];

    // Actions
    startTest: () => void;
    resetTest: () => void;
    finishTest: () => void;
}