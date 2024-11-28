import { Period } from "./period";
import { Removals } from "./removals";
import { Score } from "./score";
import { ShotClock } from "./shot-clock";
import { TimeOut } from "./time-out";
import { Timer } from "./timer";
import { TournamentName } from "./tournament-name";

export function Scoreboard({
    period,
    leftScore,
    rightScore,
    seconds,
    secondsTimer,
    tournamentName,
    rightTeamName,
    leftTeamName,
    leftPlayers,
    rightPlayers,
    timerStartAt,
    isCountEnd,
    startAt,
    isCountEndShot,
    isTimeOut,
    timeOutState,
}) {
    return (
        <main className="flex flex-col m-2">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <Score
                        team="white"
                        teamName={leftTeamName}
                        score={leftScore}
                    />
                </div>
                <div className="basis-1/2">
                    <TournamentName tournamentName={tournamentName} />
                    <div className="flex flex-row">
                        <div className="basis-1/2">
                            <ShotClock
                                seconds={seconds}
                                isCountEndShot={isCountEndShot}
                                startAt={startAt}
                            />
                        </div>
                        <div className="basis-1/2">
                            {isTimeOut ? (
                                <TimeOut timeOutState={timeOutState} />
                            ) : (
                                <Period period={period} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="basis-1/4">
                    <Score
                        team="blue"
                        teamName={rightTeamName}
                        score={rightScore}
                    />
                </div>
            </div>

            <div className="flex flex-row">
                <div className="flex justify-center items-start basis-1/4">
                    <Removals team={"white"} players={leftPlayers} />
                </div>
                <div className="basis-1/2">
                    <Timer
                        secondsTimer={secondsTimer}
                        timerStartAt={timerStartAt}
                        isCountEnd={isCountEnd}
                    />
                </div>
                <div className="flex justify-center items-start basis-1/4">
                    <Removals team={"blue"} players={rightPlayers} />
                </div>
            </div>
        </main>
    );
}
