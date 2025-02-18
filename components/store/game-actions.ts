import { PlayersList, TeamName } from "./game-types";

export const GameActionType = {
    INCREASE_PERIOD: "INCREASE_PERIOD",
    DECREASE_PERIOD: "DECREASE_PERIOD",
    SET_SCORE: "SET_SCORE",
    RESET_GAME: "RESET_GAME",
    SET_TIMEOUT: "SET_TIMEOUT",
    SET_TOURNAMENT_NAME: "SET_TOURNAMENT_NAME",
    SET_TEAM_NAME: "SET_TEAM_NAME",
    SET_PLAYERS: "SET_PLAYERS",
    SET_TEAM_NAMES_LIST: "SET_TEAM_NAMES_LIST",
} as const;

export type GameAction =
    | { type: typeof GameActionType.INCREASE_PERIOD }
    | { type: typeof GameActionType.DECREASE_PERIOD }
    | {
          type: typeof GameActionType.SET_SCORE;
          team: "leftScore" | "rightScore";
          change: number;
      }
    | { type: typeof GameActionType.RESET_GAME }
    | { type: typeof GameActionType.SET_TIMEOUT; isTimeOut: boolean }
    | { type: typeof GameActionType.SET_TOURNAMENT_NAME; name: string }
    | {
          type: typeof GameActionType.SET_TEAM_NAME;
          team: "leftTeam" | "rightTeam";
          name: TeamName;
      }
    | { type: typeof GameActionType.SET_PLAYERS; players: PlayersList }
    | { type: typeof GameActionType.SET_TEAM_NAMES_LIST; list: TeamName[] };
