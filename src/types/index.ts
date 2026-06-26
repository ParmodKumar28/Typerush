export type TimeMode = 15 | 30 | 60 | 120;
export type Difficulty = "easy" | "medium" | "hard";
export type TestStatus = "idle" | "running" | "finished";

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
    wpmTimeline: number[];
}