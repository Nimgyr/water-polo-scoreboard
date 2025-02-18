export interface ShotClockProps {
    shotClockState: {
        seconds: string;
        startAt: number | null;
        isCountEnd: boolean;
    };
    shotClockControls: {
        resetShotClock: (value: number, pauseWhenReset?: boolean) => void;
        toggleShotClock: () => void;
    };
}

export interface TimerProps {
    timerState: {
        timerStartAt: number | null;
        seconds: number;
        isCountEnd: boolean;
    };
    timerControls: {
        resetTimer: () => void;
        toggleTimer: () => void;
        setStart: (value: number) => void;
        setStartFrom: (value: number) => void;
    };
}
