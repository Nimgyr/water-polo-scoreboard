import { useEffect, useState } from "react";
import { useNow } from "./use-now";
import { useBuzzer } from "./use-buzzer";

export function useTimer() {
    const [timerStartAt, setTimerStartAt] = useState();
    const [initialTimer, setInitialTimer] = useState(0);
    const [startFrom, setstartFrom] = useState(420000);
    const [start, setstart] = useState(420000);

    const now = useNow(1000, timerStartAt);

    const timeFromStart = now - (timerStartAt ?? now);

    const timer = timeFromStart + initialTimer;
    const countDown = Math.max(0, startFrom - timer);
    const secondsTimer = Math.ceil(countDown / 1000);

    const toggleTimer = () => {
        if (timerStartAt) {
            setInitialTimer(timer);
            setTimerStartAt();
        } else {
            setTimerStartAt(Date.now());
        }
    };
    const resetTimer = () => {
        setInitialTimer(0);
        setstartFrom(start);
        setTimerStartAt();
    };

    const isCountEnd = countDown === 0;
    const buzzer = useBuzzer();

    useEffect(() => {
        if (isCountEnd) {
            buzzer();
        }
    }, [isCountEnd]);
    return {
        resetTimer,
        toggleTimer,
        timerStartAt,
        secondsTimer,
        setstart,
        setstartFrom,
        isCountEnd,
    };
}
