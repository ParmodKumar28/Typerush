import { easyWords, mediumWords, hardWords } from "@/data/wordLists";
import { Difficulty, WordState } from "@/types/index";

export function generateWords(difficulty: Difficulty, count = 60): WordState[] {
    const pool = difficulty === "easy" ? easyWords : difficulty === "medium" ? mediumWords : hardWords;

    const selected: WordState[] = [];

    for (let i = 0; i < count; i++) {
        const word = pool[Math.floor(Math.random() * pool.length)];
        selected.push({
            word,
            chars: word.split("").map(char => ({ char, status: "pending" }))
        });
    }
    return selected;
}