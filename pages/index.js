import React, { useState } from "react";

import { Header } from "../components/header";
import { ControlPanel } from "../components/control-panel/control-panel";
import NewWindowComponent from "../components/new-window/new-window";
import { Scoreboard } from "@/components/scoreboard/scoreboard";

import { useGameState } from "@/components/custom-hooks/use-game-state";
import { useShotClock } from "@/components/custom-hooks/use-shot-clock";
import { useTimer } from "@/components/custom-hooks/use-timer";

import { useTimeOut } from "@/components/custom-hooks/use-time-out";
import NewMiniWindowComponent from "@/components/new-window/new-mini-window";
import { MiniScoreboard } from "@/components/mini-scoreboard/mini-scoreboard";

export default function Home() {
    const [isNewWindow, setIsNewWindow] = useState(false);
    let openNewWindow = () => {
        setIsNewWindow(true);
    };

    const [isMiniWindow, setIsMiniWindow] = useState(false);
    let openMiniWindow = () => {
        setIsMiniWindow(true);
    };

    const gameState = useGameState();

    const shotClockState = useShotClock();

    const timeOutState = useTimeOut();
    const [isTimeOut, setIsTimeOut] = useState(false);
    const toggleTimeOut = () => {
        setIsTimeOut(() => !isTimeOut);
        timeOutState.resetShotClock60();
    };

    const timerState = useTimer();

    const resetGame = () => {
        gameState.resetState();
        shotClockState.resetShotClock30();
        timerState.resetTimer();
        timeOutState.resetShotClock60();
    };

    return (
        <div className="h-screen">
            <Header
                openSecondWindow={openNewWindow}
                openMiniWindow={openMiniWindow}
                resetGame={resetGame}
                toggleTimeOut={toggleTimeOut}
                isTimeOut={isTimeOut}
                teamData={gameState.teamData}
                setTeamData={gameState.setTeamData}
                tournamentName={gameState.tournamentName}
                setTournamentName={gameState.setTournamentName}
            />
            <ControlPanel
                gameState={gameState}
                shotClockState={shotClockState}
                timerState={timerState}
                timeOutState={timeOutState}
                isTimeOut={isTimeOut}
            />

            <div>
                {isNewWindow && (
                    <NewWindowComponent onClose={() => setIsNewWindow(false)}>
                        <div className="h-screen w-screen border-[10px] border-solid border-white">
                            <Scoreboard
                                period={gameState.period}
                                leftScore={gameState.leftScore}
                                rightScore={gameState.rightScore}
                                tournamentName={gameState.tournamentName}
                                rightTeamName={gameState.rightTeamName}
                                leftTeamName={gameState.leftTeamName}
                                leftPlayers={gameState.leftPlayers}
                                rightPlayers={gameState.rightPlayers}
                                seconds={shotClockState.seconds}
                                startAt={shotClockState.startAt}
                                isCountEndShot={shotClockState.isCountEnd}
                                secondsTimer={timerState.secondsTimer}
                                timerStartAt={timerState.timerStartAt}
                                isCountEnd={timerState.isCountEnd}
                                isTimeOut={isTimeOut}
                                timeOutState={timeOutState}
                            />
                        </div>
                    </NewWindowComponent>
                )}
                {isMiniWindow && (
                    <NewMiniWindowComponent
                        onClose={() => setIsMiniWindow(false)}
                    >
                        <MiniScoreboard
                            period={gameState.period}
                            leftScore={gameState.leftScore}
                            rightScore={gameState.rightScore}
                            rightTeamName={gameState.rightTeamName}
                            leftTeamName={gameState.leftTeamName}
                            secondsTimer={timerState.secondsTimer}
                        />
                    </NewMiniWindowComponent>
                )}
            </div>
        </div>
    );
}
