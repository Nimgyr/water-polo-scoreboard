import { PeriodControl } from "./period-control";
import { RemovalsControl } from "./removals-control";
import { ScoreControl } from "./score-control";
import { ShotClockControl } from "./shot-clock-control";
import { TimeOutControl } from "./time-out-control";
import { TimerControl } from "./timer-control";
import { TournamentNameControl } from "./tournament-name-control";

export function ControlPanel({
    gameState,
    shotClockState,
    timerState,
    timeOutState,
    isTimeOut,
}) {
    const {
        period,
        handlePeriodMinusClick,
        handlePeriodPlusClick,
        leftScore,
        handleLeftScoreMinusClick,
        handleLeftScorePlusClick,
        rightScore,
        handleRightScoreMinusClick,
        handleRightScorePlusClick,
        leftTeamName,
        setleftTeamName,
        rightTeamName,
        setRightTeamName,
        tournamentName,
        setTournamentName,
        leftPlayers,
        setLeftPlayers,
        rightPlayers,
        setRightPlayers,
        teamData,
        setTeamData,
    } = gameState;

    return (
        <main className="flex flex-col m-2">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <ScoreControl
                        team="white"
                        score={leftScore}
                        handleScoreMinusClick={handleLeftScoreMinusClick}
                        handleScorePlusClick={handleLeftScorePlusClick}
                        teamName={leftTeamName}
                        setTeamNameMain={setleftTeamName}
                        teamData={teamData}
                        setTeamData={setTeamData}
                    />
                </div>
                <div className="basis-1/2">
                    <TournamentNameControl
                        tournamentName={tournamentName}
                        setTournamentName={setTournamentName}
                    />
                    <div className="flex flex-row">
                        <div className="basis-1/2">
                            <ShotClockControl shotClockState={shotClockState} />
                        </div>
                        <div className="basis-1/2">
                            {isTimeOut ? (
                                <TimeOutControl timeOutState={timeOutState} />
                            ) : (
                                <PeriodControl
                                    periodCount={period}
                                    handlePeriodMinusClick={
                                        handlePeriodMinusClick
                                    }
                                    handlePeriodPlusClick={
                                        handlePeriodPlusClick
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="basis-1/4">
                    <ScoreControl
                        team="blue"
                        score={rightScore}
                        handleScoreMinusClick={handleRightScoreMinusClick}
                        handleScorePlusClick={handleRightScorePlusClick}
                        teamName={rightTeamName}
                        setTeamNameMain={setRightTeamName}
                        teamData={teamData}
                        setTeamData={setTeamData}
                    />
                </div>
            </div>
            <div className="flex  flex-row">
                <div className="flex justify-center basis-1/4">
                    <RemovalsControl
                        team={"white"}
                        players={leftPlayers}
                        setPlayers={setLeftPlayers}
                    />
                </div>
                <div className="basis-1/2">
                    <TimerControl timerState={timerState} />
                </div>
                <div className="flex justify-center basis-1/4">
                    <RemovalsControl
                        team={"blue"}
                        players={rightPlayers}
                        setPlayers={setRightPlayers}
                    />
                </div>
            </div>
        </main>
    );
}
