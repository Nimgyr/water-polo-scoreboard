export const getTeams = () => {
    return fetch("/api/teams", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const putTeams = (updatedTeams) => {
    return fetch("/api/teams", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            teams: updatedTeams,
        }),
    });
};

export const getCompetition = () => {
    return fetch("/api/competitions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const putCompetition = (updatedCompetition) => {
    return fetch("/api/competitions", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 1,
            name: updatedCompetition || " ",
        }),
    });
};
