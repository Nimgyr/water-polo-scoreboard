import { GameState } from "./game-types";
import { GameAction, GameActionType } from "./game-actions";
import { initialState } from "../data/game-initial-state";

export const gameReducer = (
    state: GameState,
    action: GameAction
): GameState => {
    switch (action.type) {
        case GameActionType.INCREASE_PERIOD:
            return { ...state, period: state.period + 1 };

        case GameActionType.DECREASE_PERIOD:
            return { ...state, period: Math.max(1, state.period - 1) };

        case GameActionType.SET_SCORE:
            return {
                ...state,
                score: {
                    ...state.score,
                    [action.team]: Math.max(
                        0,
                        state.score[action.team] + action.change
                    ),
                },
            };

        case GameActionType.SET_TIMEOUT:
            return { ...state, isTimeOut: action.isTimeOut };

        case GameActionType.SET_TOURNAMENT_NAME:
            return { ...state, tournamentName: action.name };

        case GameActionType.SET_TEAM_NAME:
            return {
                ...state,
                teamNames: {
                    ...state.teamNames,
                    [action.team]: action.name,
                },
            };

        case GameActionType.SET_PLAYERS:
            return { ...state, players: action.players };

        case GameActionType.SET_TEAM_NAMES_LIST:
            return { ...state, teamNamesList: action.list };

        case GameActionType.RESET_GAME:
            return {
                ...state,
                period: initialState.period,
                score: initialState.score,
                players: initialState.players,
                isTimeOut: initialState.isTimeOut,
            };

        default:
            return state;
    }
};
