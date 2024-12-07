import { useEffect, useState } from "react";
import { getCompetition, getTeams } from "../API/api";

export function useGameState() {
    const [teamData, setTeamData] = useState([]);
    const [leftTeamName, setleftTeamName] = useState("Белые");
    const [rightTeamName, setRightTeamName] = useState("Синие");
    const [tournamentName, setTournamentName] = useState(
        "Первый тур Первенства России по водному поло среди юношей до 18 лет"
    );

    useEffect(() => {
        getTeams()
            .then((res) => res.json())
            .then((data) => setTeamData(data));

        getCompetition()
            .then((res) => res.json())
            .then((data) => setTournamentName(data[0].name));
    }, []);

    const initialPlayersState = [
        {
            id: 1,
            removals: 0,
        },
        {
            id: 2,
            removals: 0,
        },
        {
            id: 3,
            removals: 0,
        },
        {
            id: 4,
            removals: 0,
        },
        {
            id: 5,
            removals: 0,
        },
        {
            id: 6,
            removals: 0,
        },
        {
            id: 7,
            removals: 0,
        },
        {
            id: 8,
            removals: 0,
        },
        {
            id: 9,
            removals: 0,
        },
        {
            id: 10,
            removals: 0,
        },
        {
            id: 11,
            removals: 0,
        },
        {
            id: 12,
            removals: 0,
        },
        {
            id: 13,
            removals: 0,
        },
        {
            id: 14,
            removals: 0,
        },
    ];
    const [leftPlayers, setLeftPlayers] = useState(initialPlayersState);
    const [rightPlayers, setRightPlayers] = useState(initialPlayersState);

    const [period, setPeriod] = useState(1);

    const handlePeriodMinusClick = () => {
        if (period > 1) {
            setPeriod(period - 1);
        }
    };
    const handlePeriodPlusClick = () => {
        if (period < 4) {
            setPeriod(period + 1);
        }
    };

    const [leftScore, setLeftScore] = useState(0);

    const handleLeftScoreMinusClick = () => {
        if (leftScore > 0) {
            setLeftScore(leftScore - 1);
        }
    };
    const handleLeftScorePlusClick = () => {
        setLeftScore(leftScore + 1);
    };

    const [rightScore, setRightScore] = useState(0);

    const handleRightScoreMinusClick = () => {
        if (rightScore > 0) {
            setRightScore(rightScore - 1);
        }
    };
    const handleRightScorePlusClick = () => {
        setRightScore(rightScore + 1);
    };

    const resetState = () => {
        setleftTeamName("Белые");
        setRightTeamName("Синие");
        setLeftPlayers(initialPlayersState);
        setRightPlayers(initialPlayersState);
        setPeriod(1);
        setLeftScore(0);
        setRightScore(0);
    };

    return {
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
        resetState,
        teamData,
        setTeamData,
    };
}
