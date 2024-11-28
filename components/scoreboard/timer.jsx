export function Timer({ timerStartAt, isCountEnd, secondsTimer }) {
    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Время</h1>
            </div>
            <div
                className={`text-clampTimerScoreboard font-digital flex justify-center ${
                    timerStartAt ? "text-toxicGreen" : "text-white"
                } ${isCountEnd ? "text-toxicRed" : ""} `}
            >
                {("00" + Math.floor(secondsTimer / 60)).slice(-2)}:
                {("00" + (secondsTimer % 60)).slice(-2)}
            </div>
        </>
    );
}
