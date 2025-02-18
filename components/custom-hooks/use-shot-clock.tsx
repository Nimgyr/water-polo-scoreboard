import { useEffect, useState } from "react";
import { useNow } from "./use-now";
import { ShotClockProps } from "../types/data";
import { useBuzzer } from "./use-buzzer";

const DEFAULT_DURATION_SECONDS = 30;

export function useShotClock(
    defaultDurationSeconds: number = DEFAULT_DURATION_SECONDS
): ShotClockProps {
    const [startAt, setStartAt] = useState<number | null>(null);
    const [accumulatedTime, setAccumulatedTime] = useState<number>(0);
    const [durationMs, setDurationMs] = useState<number>(
        defaultDurationSeconds * 1000
    );

    const now = useNow(1000, startAt);
    const timeFromStart = now - (startAt ?? now);
    const timer = timeFromStart + accumulatedTime;
    const countDown = Math.max(0, durationMs - timer);
    const seconds = ("00" + Math.ceil(countDown / 1000)).slice(-2);
    const isCountEnd = countDown === 0;

    const toggleShotClock = () => {
        if (startAt) {
            setAccumulatedTime(timer);
            setStartAt(null);
        } else {
            setStartAt(Date.now());
        }
    };

    const resetShotClock = (
        seconds: number,
        pauseWhenReset: boolean = false
    ) => {
        setAccumulatedTime(0);
        setDurationMs(seconds * 1000);

        if (pauseWhenReset === true) {
            setStartAt(null);
        } else {
            setStartAt(Date.now());
        }
    };

    const buzzer = useBuzzer();

    useEffect(() => {
        if (isCountEnd) {
            buzzer();
        }
    }, [isCountEnd]);

    return {
        shotClockState: {
            seconds,
            startAt,
            isCountEnd,
        },
        shotClockControls: {
            resetShotClock,
            toggleShotClock,
        },
    };
}
