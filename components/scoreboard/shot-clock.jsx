import { ScoreCount } from "../uikit/score-count";

export function ShotClock({ seconds, isCountEndShot, startAt }) {
    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Время атаки</h1>
            </div>
            <div
                className={`font-digital flex justify-center leading-[150px] text-clampScoreboard ${
                    startAt ? "text-toxicGreen" : "text-white"
                } ${isCountEndShot ? "text-toxicRed" : ""} `}
            >
                {seconds}
            </div>
        </>
    );
}
