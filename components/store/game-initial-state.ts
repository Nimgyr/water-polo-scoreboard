const initialPlayersList = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    removals: 0,
}));
export const initialState = {
    period: 1,
    score: { leftScore: 0, rightScore: 0 },
    initialPlayersList: Array.from({ length: 14 }, (_, index) => ({
        id: index + 1,
        removals: 0,
    })),
    players: {
        leftTeamPlayers: [...initialPlayersList],
        rightTeamPlayers: [...initialPlayersList],
    },
    tournamentName: "Соревнование",
    teamNames: {
        leftTeam: { id: 0, name: "Белые", shortName: "бел" },
        rightTeam: { id: 1, name: "Синие", shortName: "син" },
    },
    teamNamesList: [
        { id: 0, name: "белые", shortName: "бел" },
        { id: 1, name: "синие", shortName: "син" },
    ],
    isTimeOut: false,
};
