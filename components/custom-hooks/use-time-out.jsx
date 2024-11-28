import { useEffect, useState } from "react";
import { useNow } from "./use-now";
import { useBuzzer } from "./use-buzzer";

export function useTimeOut() {
    const [startAt, setStartAt] = useState();
    const [initialTimer, setInitialTimer] = useState(0);
    const [startFrom, setstartFrom] = useState(60000);

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
    const resetShotClock60 = () => {
        setInitialTimer(0);
        setstartFrom(60000);
        setStartAt();
    };

    const buzzer = useBuzzer();

    const is45 = seconds == 15;
    useEffect(() => {
        if (is45) {
            buzzer();
        }
    }, [is45]);

    const isCountEnd = countDown === 0;
    useEffect(() => {
        if (isCountEnd) {
            buzzer();
        }
    }, [isCountEnd]);
    return {
        resetShotClock60,
        toggleShotClock,
        seconds,
        startAt,
        isCountEnd,
    };
}
