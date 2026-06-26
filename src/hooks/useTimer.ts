import { useEffect, useRef } from "react";
import { useTypingStore } from "@/store/typingStore";

export function useTimer() {
    const { status, tickTimer } = useTypingStore();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (status === "running") {
            intervalRef.current = setInterval(() => {
                tickTimer();
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [status, tickTimer]);
}