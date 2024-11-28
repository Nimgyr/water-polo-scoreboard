import { ScoreCount } from "../uikit/score-count";
import { UiButton } from "../uikit/ui-button";

export function PeriodControl({
    periodCount,
    handlePeriodMinusClick,
    handlePeriodPlusClick,
}) {
    return (
        <>
            <div className="flex flex-row justify-center">
                <h1 className="text-3xl">Период</h1>
            </div>
            <div>
                <ScoreCount size={"sm"}>
                    {("00" + periodCount).slice(-2)}
                </ScoreCount>
                <div className="flex justify-center gap-5">
                    <UiButton
                        variant="secondary"
                        size="sm"
                        onClick={handlePeriodMinusClick}
                    >
                        -1
                    </UiButton>
                    <UiButton
                        variant="secondary"
                        size="sm"
                        onClick={handlePeriodPlusClick}
                    >
                        +1
                    </UiButton>
                </div>
            </div>
        </>
    );
}
