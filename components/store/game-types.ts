export interface TeamName {
    id: number;
    name: string;
    shortName: string;
}

export interface Names {
    leftTeam: TeamName;
    rightTeam: TeamName;
}

interface Score {
    leftScore: number;
    rightScore: number;
}

interface Player {
    id: number;
    removals: number;
}

export interface PlayersList {
    leftTeamPlayers: Player[];
    rightTeamPlayers: Player[];
}

export interface GameState {
    period: number;
    isTimeOut: boolean;
    score: Score;
    tournamentName: string;
    teamNames: Names;
    teamNamesList: TeamName[];
    players: PlayersList;
}
