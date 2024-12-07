/**
 * @param {{
 * team: 'white' | 'blue'
 * }} props
 */

import { UiButton } from "../uikit/ui-button";
import { EditTeamSelect } from "./edit-team-select";

export function ScoreControl({
    team,
    score,
    handleScoreMinusClick,
    handleScorePlusClick,
    setTeamNameMain,
    teamName,
    teamData,
    setTeamData,
}) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center">
                <EditTeamSelect
                    setTeamNameMain={setTeamNameMain}
                    team={team}
                    teamNameMain={teamName}
                    teamData={teamData}
                    setTeamData={setTeamData}
                />
            </div>
            <div className="bg-black  rounded-3xl max-w-[150px] p-2 aspect-square  flex flex-col justify-center items-center">
                <div className="text-clamp font-digital text-amber-400 flex justify-center p-2">
                    {("00" + score).slice(-2)}
                </div>
                <div className="pb-5 w-full flex justify-evenly">
                    <UiButton
                        variant="secondary"
                        size="sm"
                        onClick={handleScoreMinusClick}
                    >
                        -1
                    </UiButton>
                    <UiButton
                        variant="secondary"
                        size="sm"
                        onClick={handleScorePlusClick}
                    >
                        +1
                    </UiButton>
                </div>
            </div>
        </div>
    );
}
