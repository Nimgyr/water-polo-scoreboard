import { useEffect, useState } from "react";
import { useNow } from "./use-now";
import { useBuzzer } from "./use-buzzer";
import { TimerProps } from "../types/data";

export function useTimer(): TimerProps {
    const [timerStartAt, setTimerStartAt] = useState<number | null>(null);
    const [initialTimer, setInitialTimer] = useState(0);
    const [startFrom, setStartFrom] = useState(420000);
    const [start, setStart] = useState(420000);

    const now = useNow(1000, timerStartAt);

    const timeFromStart = now - (timerStartAt ?? now);

    const timer = timeFromStart + initialTimer;
    const countDown = Math.max(0, startFrom - timer);
    const seconds = Math.ceil(countDown / 1000);

    const toggleTimer = () => {
        if (timerStartAt) {
            setInitialTimer(timer);
            setTimerStartAt(null);
        } else {
            setTimerStartAt(Date.now());
        }
    };

    const resetTimer = () => {
        setInitialTimer(0);
        setStartFrom(start);
        setTimerStartAt(null);
    };

    const isCountEnd = countDown === 0;
    const buzzer = useBuzzer();

    useEffect(() => {
        if (isCountEnd) {
            buzzer();
        }
    }, [isCountEnd]);

    return {
        timerState: {
            timerStartAt,
            seconds,
            isCountEnd,
        },
        timerControls: {
            resetTimer,
            toggleTimer,
            setStart,
            setStartFrom,
        },
    };
}
