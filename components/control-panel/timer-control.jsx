import { useBuzzer } from "../custom-hooks/use-buzzer";
import { EditButton } from "../uikit/edit-button";
import { UiButton } from "../uikit/ui-button";

export function TimerControl({ timerState }) {
    const {
        resetTimer,
        toggleTimer,
        secondsTimer,
        setstart,
        setstartFrom,
        timerStartAt,
        isCountEnd,
    } = timerState;

    const buzzer = useBuzzer();

    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Время</h1>
            </div>
            <div className="">
                <div
                    className={`text-clampTimer font-digital flex justify-center ${
                        timerStartAt ? "text-toxicGreen" : "text-white"
                    } ${isCountEnd ? "text-toxicRed" : ""} `}
                >
                    {("00" + Math.floor(secondsTimer / 60)).slice(-2)}:
                    {("00" + (secondsTimer % 60)).slice(-2)}
                </div>
                <div className="flex justify-center gap-5">
                    <UiButton
                        onClick={toggleTimer}
                        variant="secondary"
                        size="sm"
                    >
                        {!timerStartAt ? (
                            <svg
                                className="size-[4vw] max-w-8 max-h-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 5V19L19 12L8 5Z" fill="white" />
                            </svg>
                        ) : (
                            <svg
                                className="size-[4vw] max-w-8 max-h-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                    </UiButton>
                    <UiButton
                        onClick={resetTimer}
                        variant="secondary"
                        size="sm"
                    >
                        <svg
                            className="size-[4vw] max-w-8 max-h-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z"
                                fill="white"
                            />
                        </svg>
                    </UiButton>
                    <EditButton
                        setstart={setstart}
                        setstartFrom={setstartFrom}
                    />
                    <UiButton onClick={buzzer} variant="secondary" size="sm">
                        <svg
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 7V9H20V7H16ZM14 13.61C14.96 14.32 16.21 15.26 17.2 16C17.6 15.47 18 14.93 18.4 14.4C17.41 13.66 16.16 12.72 15.2 12C14.8 12.54 14.4 13.08 14 13.61ZM18.4 1.6C18 1.07 17.6 0.53 17.2 0C16.21 0.74 14.96 1.68 14 2.4C14.4 2.93 14.8 3.47 15.2 4C16.16 3.28 17.41 2.35 18.4 1.6ZM2 5C0.9 5 0 5.9 0 7V9C0 10.1 0.9 11 2 11H3V15H5V11H6L11 14V2L6 5H2ZM13.5 8C13.5 6.67 12.92 5.47 12 4.65V11.34C12.92 10.53 13.5 9.33 13.5 8Z"
                                fill="white"
                            />
                        </svg>
                    </UiButton>
                </div>
            </div>
        </>
    );
}
