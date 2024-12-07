"use client";
import { useEffect, useState, useTransition } from "react";
import { getCompetition, getTeams, putCompetition, putTeams } from "../API/api";
import { X } from "lucide-react"; // Import the X icon

export default function TeamNamesControl({
    teamData,
    setTeamData,
    setTournamentName,
    tournamentName,
}) {
    const [open, setOpen] = useState(false);
    const [teamNames, setTeamNames] = useState([]);
    const [competitionName, setCompetitionName] = useState();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        getTeams()
            .then((res) => res.json())
            .then((data) => setTeamNames(data));

        getCompetition()
            .then((res) => res.json())
            .then((data) => setCompetitionName(data[0].name));
    }, []);

    const addTeamField = () => {
        setTeamNames([...teamNames, { id: teamNames.length + 1, name: "" }]);
    };

    const removeLastTeam = () => {
        if (teamNames.length > 1) {
            setTeamNames(teamNames.slice(0, -1));
        }
    };

    const updateTeamName = (id, value) => {
        const newTeamNames = [...teamNames];
        newTeamNames[id - 1].name = value;
        setTeamNames(newTeamNames);
    };

    const updateCompetitionName = (value) => {
        const newCompetitionName = [...teamNames];
        console.log(value);

        setCompetitionName(value);
    };

    const reset = () => {
        setTeamNames(teamData);
        setOpen(false);
    };

    const saveTeams = async () => {
        const updatedTeams = teamNames.filter(
            (item) => item.name.trim() !== ""
        );
        startTransition(async () => {
            try {
                const response = await putTeams(updatedTeams);

                if (!response.ok) {
                    throw new Error("Failed to save teams");
                }
                setTeamData(updatedTeams);
                setOpen(false);
            } catch (error) {
                console.error("Error saving teams:", error);
            }
        });
        startTransition(async () => {
            try {
                const response = await putCompetition(competitionName);

                if (!response.ok) {
                    throw new Error("Failed to save teams");
                }
                setTournamentName(competitionName);
                setOpen(false);
            } catch (error) {
                console.error("Error saving teams:", error);
            }
        });
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    return (
        <div className="relative">
            <button
                className="flex items-center font-semibold text-deepBlue hover:text-blue-500 transition-colors"
                onClick={() => setOpen(true)}
            >
                Начать соревнования
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-white rounded-lg p-6 h-[670px] w-full max-w-md relative">
                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-black text-xl font-bold mb-4 flex justify-center">
                            Управление названиями
                        </h2>
                        <div className="space-y-4 h-max">
                            <input
                                type="text"
                                value={competitionName}
                                onChange={(e) =>
                                    updateCompetitionName(e.target.value)
                                }
                                placeholder={`Название соревнования`}
                                className="text-black px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            <div className="max-h-[400px] space-y-3 overflow-y-auto overflow-x-hidden">
                                {teamNames.map((team) => (
                                    <input
                                        key={team.id}
                                        type="text"
                                        value={team.name}
                                        onChange={(e) =>
                                            updateTeamName(
                                                team.id,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`Название команды ${team.id}`}
                                        className="text-black px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                ))}
                            </div>
                            <div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addTeamField();
                                        }}
                                        className="w-1/2 px-4 py-2 bg-gray-200 text-gray-800 rounded-l hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                                    >
                                        Добавить команду
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeLastTeam();
                                        }}
                                        className="w-1/2 px-4 py-2 bg-gray-200 text-gray-800 rounded-r hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                                    >
                                        Убрать команду
                                    </button>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full flex space-x-3 p-6 ">
                                <button
                                    onClick={reset}
                                    className="px-4 py-2 w-1/2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                                >
                                    Сбросить
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        saveTeams();
                                    }}
                                    disabled={isPending}
                                    className={`px-4 py-2 w-1/2 bg-gray-600 text-white rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                        isPending
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {isPending
                                        ? "Сохранение..."
                                        : "Сохранить данные"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
