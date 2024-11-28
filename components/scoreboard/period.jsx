import { ScoreCount } from "../uikit/score-count";

export function Period({ period }) {
    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Период</h1>
            </div>
            <ScoreCount size={"lg"}>{("00" + period).slice(-2)}</ScoreCount>
        </>
    );
}
