import { ScoreCount } from "../uikit/score-count";
import { UiButton } from "../uikit/ui-button";

export function ShotClockControl({ shotClockState }) {
    const {
        resetShotClock30,
        resetShotClock20,
        toggleShotClock,
        startAt,
        seconds,
        isCountEnd,
    } = shotClockState;

    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Время атаки</h1>
            </div>
            <div>
                <div
                    className={`font-digital flex justify-center leading-[150px] text-clamp ${
                        startAt ? "text-toxicGreen" : "text-white"
                    } ${isCountEnd ? "text-toxicRed" : ""} `}
                    size={"sm"}
                >
                    {seconds}{" "}
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
                        onClick={resetShotClock20}
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
                            <path
                                d="M15.17 14.2401C15.17 14.5601 15.14 14.8401 15.07 15.0601C15 15.2801 14.9 15.4801 14.78 15.6301C14.66 15.7801 14.5 15.8901 14.33 15.9601C14.16 16.0301 13.96 16.0601 13.74 16.0601C13.52 16.0601 13.33 16.0301 13.15 15.9601C12.97 15.8901 12.82 15.7801 12.69 15.6301C12.56 15.4801 12.46 15.2901 12.39 15.0601C12.32 14.8301 12.28 14.5601 12.28 14.2401V13.5001C12.28 13.1801 12.31 12.9001 12.38 12.6801C12.45 12.4601 12.55 12.2601 12.67 12.1101C12.79 11.9601 12.95 11.8501 13.12 11.7801C13.29 11.7101 13.49 11.6801 13.71 11.6801C13.93 11.6801 14.12 11.7101 14.3 11.7801C14.48 11.8501 14.63 11.9601 14.76 12.1101C14.89 12.2601 14.99 12.4501 15.06 12.6801C15.13 12.9101 15.17 13.1801 15.17 13.5001V14.2401ZM14.32 13.3801C14.32 13.1901 14.31 13.0301 14.28 12.9001C14.25 12.7701 14.21 12.6701 14.16 12.5901C14.11 12.5101 14.05 12.4501 13.97 12.4201C13.89 12.3901 13.81 12.3701 13.72 12.3701C13.63 12.3701 13.54 12.3901 13.47 12.4201C13.4 12.4501 13.33 12.5101 13.28 12.5901C13.23 12.6701 13.19 12.7701 13.16 12.9001C13.13 13.0301 13.12 13.1901 13.12 13.3801V14.3501C13.12 14.5401 13.13 14.7001 13.16 14.8301C13.19 14.9601 13.23 15.0701 13.28 15.1501C13.33 15.2301 13.39 15.2901 13.47 15.3201C13.55 15.3501 13.63 15.3701 13.72 15.3701C13.81 15.3701 13.9 15.3501 13.97 15.3201C14.04 15.2901 14.11 15.2301 14.16 15.1501C14.21 15.0701 14.25 14.9601 14.27 14.8301C14.29 14.7001 14.31 14.5401 14.31 14.3501V13.3801H14.32Z"
                                fill="white"
                            />
                            <path
                                d="M11.4766 15.4375V16H8.61719V15.5166L10.0059 14.002C10.1582 13.8301 10.2783 13.6816 10.3662 13.5566C10.4541 13.4316 10.5156 13.3193 10.5508 13.2197C10.5879 13.1182 10.6064 13.0195 10.6064 12.9238C10.6064 12.7891 10.5811 12.6709 10.5303 12.5693C10.4814 12.4658 10.4092 12.3848 10.3135 12.3262C10.2178 12.2656 10.1016 12.2354 9.96484 12.2354C9.80664 12.2354 9.67383 12.2695 9.56641 12.3379C9.45898 12.4062 9.37793 12.501 9.32324 12.6221C9.26855 12.7412 9.24121 12.8779 9.24121 13.0322H8.53516C8.53516 12.7842 8.5918 12.5576 8.70508 12.3525C8.81836 12.1455 8.98242 11.9814 9.19727 11.8604C9.41211 11.7373 9.6709 11.6758 9.97363 11.6758C10.2588 11.6758 10.501 11.7236 10.7002 11.8193C10.8994 11.915 11.0508 12.0508 11.1543 12.2266C11.2598 12.4023 11.3125 12.6104 11.3125 12.8506C11.3125 12.9834 11.291 13.1152 11.248 13.2461C11.2051 13.377 11.1436 13.5078 11.0635 13.6387C10.9854 13.7676 10.8926 13.8975 10.7852 14.0283C10.6777 14.1572 10.5596 14.2881 10.4307 14.4209L9.50781 15.4375H11.4766Z"
                                fill="white"
                            />
                        </svg>
                    </UiButton>
                    <UiButton
                        onClick={resetShotClock30}
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
                            <path
                                d="M9.55999 13.4901H10.01C10.22 13.4901 10.38 13.4401 10.49 13.3301C10.6 13.2201 10.65 13.0801 10.65 12.9001C10.65 12.8201 10.64 12.7501 10.61 12.6801C10.58 12.6101 10.55 12.5601 10.5 12.5101C10.45 12.4601 10.39 12.4201 10.32 12.4001C10.25 12.3801 10.16 12.3601 10.07 12.3601C9.98999 12.3601 9.91999 12.3701 9.84999 12.3901C9.77999 12.4101 9.71999 12.4401 9.66999 12.4901C9.61999 12.5401 9.57999 12.5801 9.54999 12.6401C9.51999 12.7001 9.49999 12.7701 9.49999 12.8401H8.64999C8.64999 12.6601 8.68999 12.5001 8.75999 12.3601C8.82999 12.2201 8.92999 12.0901 9.05999 11.9901C9.18999 11.8901 9.32999 11.8101 9.49999 11.7601C9.66999 11.7101 9.84999 11.6801 10.04 11.6801C10.25 11.6801 10.45 11.7101 10.63 11.7601C10.81 11.8101 10.96 11.8901 11.09 11.9901C11.22 12.0901 11.32 12.2201 11.39 12.3701C11.46 12.5201 11.5 12.7001 11.5 12.9001C11.5 12.9901 11.49 13.0801 11.46 13.1701C11.43 13.2601 11.39 13.3401 11.33 13.4201C11.27 13.5001 11.21 13.5701 11.13 13.6401C11.05 13.7101 10.96 13.7601 10.85 13.8101C11.09 13.9001 11.27 14.0201 11.39 14.2001C11.51 14.3801 11.57 14.5801 11.57 14.8101C11.57 15.0101 11.53 15.1901 11.45 15.3401C11.37 15.4901 11.27 15.6301 11.13 15.7301C10.99 15.8301 10.84 15.9201 10.65 15.9701C10.46 16.0201 10.27 16.0501 10.05 16.0501C9.86999 16.0501 9.68999 16.0301 9.51999 15.9801C9.34999 15.9301 9.18999 15.8601 9.05999 15.7501C8.92999 15.6401 8.80999 15.5201 8.72999 15.3701C8.64999 15.2201 8.60999 15.0301 8.60999 14.8201H9.45999C9.45999 14.9001 9.47999 14.9701 9.50999 15.0401C9.53999 15.1101 9.57999 15.1601 9.63999 15.2101C9.69999 15.2601 9.75999 15.3001 9.83999 15.3201C9.91999 15.3401 9.99999 15.3601 10.09 15.3601C10.19 15.3601 10.28 15.3501 10.36 15.3201C10.44 15.2901 10.51 15.2501 10.56 15.2001C10.61 15.1501 10.66 15.0901 10.69 15.0201C10.72 14.9501 10.73 14.8701 10.73 14.7801C10.73 14.6701 10.71 14.5701 10.68 14.4901C10.65 14.4101 10.6 14.3401 10.54 14.2901C10.48 14.2401 10.41 14.2001 10.32 14.1801C10.23 14.1601 10.14 14.1401 10.03 14.1401H9.55999V13.4901Z"
                                fill="white"
                            />
                            <path
                                d="M15.3 14.2401C15.3 14.5601 15.27 14.8401 15.2 15.0601C15.13 15.2801 15.03 15.4801 14.91 15.6301C14.79 15.7801 14.63 15.8901 14.46 15.9601C14.29 16.0301 14.09 16.0601 13.87 16.0601C13.65 16.0601 13.46 16.0301 13.28 15.9601C13.1 15.8901 12.95 15.7801 12.82 15.6301C12.69 15.4801 12.59 15.2901 12.52 15.0601C12.45 14.8301 12.41 14.5601 12.41 14.2401V13.5001C12.41 13.1801 12.44 12.9001 12.51 12.6801C12.58 12.4601 12.68 12.2601 12.8 12.1101C12.92 11.9601 13.08 11.8501 13.25 11.7801C13.42 11.7101 13.62 11.6801 13.84 11.6801C14.06 11.6801 14.25 11.7101 14.43 11.7801C14.61 11.8501 14.76 11.9601 14.89 12.1101C15.02 12.2601 15.12 12.4501 15.19 12.6801C15.26 12.9101 15.3 13.1801 15.3 13.5001V14.2401ZM14.45 13.3801C14.45 13.1901 14.44 13.0301 14.41 12.9001C14.38 12.7701 14.34 12.6701 14.29 12.5901C14.24 12.5101 14.18 12.4501 14.1 12.4201C14.02 12.3901 13.94 12.3701 13.85 12.3701C13.76 12.3701 13.67 12.3901 13.6 12.4201C13.53 12.4501 13.46 12.5101 13.41 12.5901C13.36 12.6701 13.32 12.7701 13.29 12.9001C13.26 13.0301 13.25 13.1901 13.25 13.3801V14.3501C13.25 14.5401 13.26 14.7001 13.29 14.8301C13.32 14.9601 13.36 15.0701 13.41 15.1501C13.46 15.2301 13.52 15.2901 13.6 15.3201C13.68 15.3501 13.76 15.3701 13.85 15.3701C13.94 15.3701 14.03 15.3501 14.1 15.3201C14.17 15.2901 14.24 15.2301 14.29 15.1501C14.34 15.0701 14.38 14.9601 14.4 14.8301C14.43 14.7001 14.44 14.5401 14.44 14.3501V13.3801H14.45Z"
                                fill="white"
                            />
                        </svg>
                    </UiButton>
                </div>
            </div>
        </>
    );
}
