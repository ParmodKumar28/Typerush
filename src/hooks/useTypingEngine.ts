"use client";

import { useEffect, useCallback, useRef } from "react";
import { useTypingStore } from "@/store/typingStore";
import { useTimer } from "./useTimer";
import { useTypingSounds } from "./useTypingSounds";

export function useTypingEngine() {
    const handleInput = useTypingStore((state) => state.handleInput);
    const resetTest = useTypingStore((state) => state.resetTest);
    const status = useTypingStore((state) => state.status);
    const soundEnabled = useTypingStore((state) => state.soundEnabled);
    const lastInputStatus = useTypingStore((state) => state.lastInputStatus);

    const inputRef = useRef<HTMLInputElement>(null);
    const prevStatusRef = useRef(status);
    const prevInputStatusRef = useRef(lastInputStatus);

    const { playKey, playWrong, playComplete } = useTypingSounds(soundEnabled);

    useTimer();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (status === "idle") {
            inputRef.current?.focus();
        }
    }, [status]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            const ignoredKeys = ["Shift", "Alt", "Control", "Meta", "CapsLock", "Tab"];
            if (ignoredKeys.includes(e.key)) return;

            handleInput(e.key);
        },
        [handleInput]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (
            prevInputStatusRef.current !== lastInputStatus &&
            lastInputStatus !== "idle"
        ) {
            if (lastInputStatus === "correct") {
                playKey();
            } else if (lastInputStatus === "wrong") {
                playWrong();
            }
        }

        prevInputStatusRef.current = lastInputStatus;
    }, [lastInputStatus, playKey, playWrong]);

    useEffect(() => {
        if (prevStatusRef.current !== "finished" && status === "finished") {
            playComplete();
        }

        prevStatusRef.current = status;
    }, [status, playComplete]);

    const handleReset = useCallback(() => {
        resetTest();
        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }, [resetTest]);

    return { inputRef, handleReset };
}