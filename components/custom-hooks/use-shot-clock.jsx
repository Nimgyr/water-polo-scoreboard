import { useEffect, useState } from "react";
import { useNow } from "./use-now";
import { useBuzzer } from "./use-buzzer";

export function useShotClock() {
    const [startAt, setStartAt] = useState();
    const [initialTimer, setInitialTimer] = useState(0);
    const [startFrom, setstartFrom] = useState(30000);

    const now = useNow(1000, startAt);

    const timeFromStart = now - (startAt ?? now);

    const timer = timeFromStart + initialTimer;
    const countDown = Math.max(0, startFrom - timer);
    const seconds = ("00" + Math.ceil(countDown / 1000)).slice(-2);

    const toggleShotClock = () => {
        if (startAt) {
            setInitialTimer(timer);
            setStartAt();
        } else {
            setStartAt(Date.now());
        }
    };
    const resetShotClock30 = () => {
        setInitialTimer(0);
        setstartFrom(30000);
        setStartAt();
    };
    const resetShotClock20 = () => {
        setInitialTimer(0);
        setstartFrom(20000);
        setStartAt();
    };

    const isCountEnd = countDown === 0;
    const buzzer = useBuzzer();

    useEffect(() => {
        if (isCountEnd) {
            buzzer();
        }
    }, [isCountEnd]);
    return {
        resetShotClock30,
        resetShotClock20,
        toggleShotClock,
        seconds,
        startAt,
        isCountEnd,
    };
}
