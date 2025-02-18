import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
    ReactNode,
} from "react";
import { GameState, TeamName } from "./game-types";
import { ShotClockProps, TimerProps } from "../types/data";
import { gameReducer } from "./game-reducer";

import { useShotClock } from "../custom-hooks/use-shot-clock";
import { useTimer } from "../custom-hooks/use-timer";
import { GameActionType } from "./game-actions";
import { initialState } from "./game-initial-state";

interface GameContextType extends GameState, ShotClockProps, TimerProps {
    increasePeriod: () => void;
    decreasePeriod: () => void;
    updateScore: (teamSide: "left" | "right", change: number) => void;
    resetGame: () => void;
    setTimeOut: (isTimeOut: boolean) => void;
    setTournamentName: (name: string) => void;
    setTeamName: (teamSide: "left" | "right", name: TeamName) => void;
    setPlayers: (players: GameState["players"]) => void;
    setTeamNamesList: (list: GameState["teamNamesList"]) => void;
    timeOutState: ShotClockProps;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const SHOT_CLOCK_DEFAULT_DURATION = 30;
    const TIMEOUT_DURATION = 60;

    const { shotClockControls, shotClockState } = useShotClock();
    const timeOutState = useShotClock(TIMEOUT_DURATION);
    const { timerControls, timerState } = useTimer();

    const increasePeriod = useCallback(
        () => dispatch({ type: GameActionType.INCREASE_PERIOD }),
        []
    );
    const decreasePeriod = useCallback(
        () => dispatch({ type: GameActionType.DECREASE_PERIOD }),
        []
    );
    const updateScore = useCallback(
        (teamSide: "left" | "right", change: number) => {
            const team = (teamSide + "Score") as "leftScore" | "rightScore";
            dispatch({ type: GameActionType.SET_SCORE, team, change });
        },
        []
    );

    const setTimeOut = useCallback(
        (isTimeOut: boolean) =>
            dispatch({ type: GameActionType.SET_TIMEOUT, isTimeOut }),
        []
    );
    const setTournamentName = useCallback(
        (name: string) =>
            dispatch({ type: GameActionType.SET_TOURNAMENT_NAME, name }),
        []
    );
    const setTeamName = useCallback(
        (teamSide: "left" | "right", name: TeamName) => {
            const team = (teamSide + "Team") as "leftTeam" | "rightTeam";
            dispatch({ type: GameActionType.SET_TEAM_NAME, team, name });
        },
        []
    );
    const setPlayers = useCallback(
        (players: GameState["players"]) =>
            dispatch({ type: GameActionType.SET_PLAYERS, players }),
        []
    );
    const setTeamNamesList = useCallback(
        (list: GameState["teamNamesList"]) =>
            dispatch({ type: GameActionType.SET_TEAM_NAMES_LIST, list }),
        []
    );

    const resetGame = useCallback(() => {
        dispatch({ type: GameActionType.RESET_GAME });

        timerControls.resetTimer();
        timeOutState.shotClockControls.resetShotClock(TIMEOUT_DURATION, true);
        shotClockControls.resetShotClock(SHOT_CLOCK_DEFAULT_DURATION, true);
    }, [timerControls, timeOutState.shotClockControls, shotClockControls]);

    const value: GameContextType = {
        ...state,
        increasePeriod,
        decreasePeriod,
        updateScore,
        resetGame,
        setTimeOut,
        setTournamentName,
        setTeamName,
        setPlayers,
        setTeamNamesList,
        shotClockControls,
        shotClockState,
        timeOutState,
        timerControls,
        timerState,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
};

export const useGameContext = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
