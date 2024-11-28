export function TimeOut({ timeOutState }) {
    const { seconds, isCountEnd, startAt } = timeOutState;
    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Тайм-аут</h1>
            </div>
            <div
                className={`font-digital flex justify-center leading-[150px] text-clampScoreboard ${
                    startAt ? "text-toxicGreen" : "text-white"
                } ${isCountEnd ? "text-toxicRed" : ""} `}
            >
                {seconds}
            </div>
        </>
    );
}
