import { UiButton } from "../uikit/ui-button";

export function TimeOutControl({ timeOutState }) {
    const { resetShotClock60, toggleShotClock, startAt, seconds, isCountEnd } =
        timeOutState;

    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Тайм-аут</h1>
            </div>
            <div>
                <div
                    className={`font-digital flex justify-center leading-[150px] text-clamp ${
                        startAt ? "text-toxicGreen" : "text-white"
                    } ${isCountEnd ? "text-toxicRed" : ""} `}
                    size={"sm"}
                >
                    {seconds}
                </div>

                <div className="flex flex-col justify-center gap-1"></div>

                <div className="flex justify-center gap-5">
                    <UiButton
                        onClick={toggleShotClock}
                        variant="secondary"
                        size="sm"
                    >
                        {!startAt ? (
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
                        onClick={resetShotClock60}
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
                                d="M11.99 5V1L6.98999 6L11.99 11V7C15.3 7 17.99 9.69 17.99 13C17.99 16.31 15.3 19 11.99 19C8.67999 19 5.98999 16.31 5.98999 13H3.98999C3.98999 17.42 7.56999 21 11.99 21C16.41 21 19.99 17.42 19.99 13C19.99 8.58 16.41 5 11.99 5Z"
                                fill="white"
                            />
                        </svg>
                    </UiButton>
                </div>
            </div>
        </>
    );
}
