import React, { useState } from "react";

export const RemovalsControl = ({ players, setPlayers, team }) => {
    const [hoveredId, setHoveredId] = useState(null);

    const teamColor = {
        white: "text-white",
        blue: "text-blue-500",
    }[team];

    // Увеличение `removals`
    const handlePlayerRemoval = (playerId) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === playerId
                    ? { ...player, removals: Math.min(3, player.removals + 1) }
                    : player
            )
        );
    };

    // Уменьшение `removals`
    const handlePlayerRemovalDecrease = (playerId) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === playerId
                    ? { ...player, removals: Math.max(0, player.removals - 1) }
                    : player
            )
        );
    };

    return (
        <div className="bg-black rounded-3xl p-4">
            <div className="flex justify-center pb-2">Удаления</div>
            <ul className="grid grid-cols-2 gap-4">
                {players.map((player) => (
                    <RemovalInstant
                        key={player.id}
                        player={player}
                        isHovered={hoveredId === player.id}
                        onHover={() => setHoveredId(player.id)}
                        onLeave={() => setHoveredId(null)}
                        teamColor={teamColor}
                        onIncrease={() => handlePlayerRemoval(player.id)}
                        onDecrease={() =>
                            handlePlayerRemovalDecrease(player.id)
                        }
                    />
                ))}
            </ul>
        </div>
    );
};

const RemovalInstant = ({
    player,
    isHovered,
    onHover,
    onLeave,
    teamColor,
    onIncrease,
    onDecrease,
}) => {
    const RemovalDot = ({ active }) => (
        <div
            className={`w-3 h-3 rounded-full ${
                active ? "bg-red-500" : "bg-gray-300"
            } shadow-sm`}
        />
    );

    const renderDots = () => {
        const totalDots = 3; // Общее количество точек
        return Array.from({ length: totalDots }).map((_, index) => (
            <RemovalDot key={index} active={index < player.removals} />
        ));
    };

    return (
        <li onMouseEnter={onHover} onMouseLeave={onLeave}>
            {isHovered ? (
                <div className="flex gap-1">
                    <button
                        className={`w-16 h-11 text-left p-2 rounded-l-lg transition-colors ${
                            player.removals >= 3
                                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={onIncrease}
                        disabled={player.removals >= 3}
                    >
                        <div className="flex space-x-1 m-0">{renderDots()}</div>
                    </button>
                    <button
                        className={`w-3 h-11 rounded-r-lg transition-colors ${
                            player.removals <= 0
                                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={onDecrease}
                        disabled={player.removals <= 0}
                    >
                        -
                    </button>
                </div>
            ) : (
                <div
                    className={
                        "w-20 h-11 text-xl text-left gap-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex justify-center items-center " +
                        teamColor
                    }
                >
                    {player.id}
                    <div className="flex space-x-1 m-0">{renderDots()}</div>
                </div>
            )}
        </li>
    );
};
