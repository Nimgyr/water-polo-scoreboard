import React, { useState, useEffect, useRef } from "react";

export const RemovalsControl = ({ players, setPlayers, team }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handlePlayerRemoval = (playerId) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === playerId
                    ? { ...player, removals: player.removals + 1 }
                    : player
            )
        );
        setModalOpen(false);
    };
    const handlePlayerRemovalDecrease = (playerId) => {
        setPlayers(
            (prevPlayers) =>
                prevPlayers
                    .map((player) =>
                        player.id === playerId
                            ? { ...player, removals: player.removals - 1 }
                            : player
                    )
                    .filter((player) => player.removals > 0) // Удаляем игрока, если removals <= 0
        );
        setModalOpen(false);
    };

    const handleAddPlayer = (playerNumber) => {
        const newPlayer = {
            id: Math.max(...players.map((p) => p.id), 0) + 1,
            number: playerNumber,
            removals: 1,
        };
        setPlayers((prev) => [...prev, newPlayer]);
    };
    const teamColor = {
        blue: { fill: "#739CEC", text: "text-white" },
        white: { fill: "#FFFFFF", text: "text-blue-500" },
    }[team];

    return (
        <div>
            <div className="flex gap-4">
                <button
                    onClick={handleOpenModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Удалить игрока
                </button>
            </div>
            <ul className="mt-4 grid grid-cols-2 space-y-4 ">
                {players.map((player) => (
                    <RemovalInstant
                        teamColor={teamColor}
                        key={player.id}
                        player={player}
                    />
                ))}
            </ul>
            {isModalOpen && (
                <PlayerRemovalModal
                    teamColor={teamColor}
                    players={players}
                    onClose={handleCloseModal}
                    onRemove={handlePlayerRemoval}
                    onAddPlayer={handleAddPlayer}
                    onRemovalDecrease={handlePlayerRemovalDecrease}
                />
            )}
        </div>
    );
};

const PlayerRemovalModal = ({
    players,
    onClose,
    onRemove,
    onAddPlayer,
    teamColor,
    onRemovalDecrease,
}) => {
    const modalRef = useRef(null);
    const [newPlayerNumber, setNewPlayerNumber] = useState("");
    const [error, setError] = useState("");

    const handleAddPlayer = () => {
        const number = parseInt(newPlayerNumber);

        // Проверка валидности
        if (!number || isNaN(number)) {
            setError("Введите корректный номер");
            return;
        }

        // Проверка на существование такого номера
        if (players.some((p) => p.number === number)) {
            setError("Игрок с таким номером уже существует");
            return;
        }

        onAddPlayer(number);
        setNewPlayerNumber("");
        setError("");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div
                ref={modalRef}
                className="bg-gray-500 p-5 rounded-lg shadow-lg w-[805px]"
            >
                {/* Секция добавления игрока */}
                <div className="mb-6 p-4 bg-gray-600 rounded-lg">
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={newPlayerNumber}
                            onChange={(e) => setNewPlayerNumber(e.target.value)}
                            placeholder="Номер игрока"
                            className="px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 flex-1"
                        />
                        <button
                            onClick={handleAddPlayer}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Добавить
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-400 mt-2 text-sm">{error}</p>
                    )}
                </div>

                {/* Список игроков для удаления */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Удаленные игроки
                    </h3>
                    <ul className="mt-4 grid grid-cols-4 gap-4 mx-2">
                        {players.map((player) => (
                            <RemovalModalInstant
                                teamColor={teamColor}
                                key={player.id}
                                player={player}
                                onRemove={onRemove}
                                onRemovalDecrease={onRemovalDecrease}
                            />
                        ))}
                    </ul>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export const RemovalInstant = ({ player, teamColor }) => {
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
        <li className="flex items-center px-5 pb-5 gap-2">
            <div className="relative w-[70px] h-[80px] flex justify-center">
                <svg
                    width="70"
                    height="80"
                    viewBox="0 0 70 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M60.0122 8.11842C65.6993 11.8869 69.6576 17.1406 69.6536 24.4946C70.4369 27.1009 69.6443 28.4598 67.5858 29.275C59.93 32.3067 55.3551 37.9936 52.6294 45.6947C50.2323 52.4678 47.4592 59.1099 44.688 65.7477L44.6873 65.7493C44.133 67.077 43.5787 68.4046 43.0276 69.7329L39.0685 74.5306C31.2544 70.4252 23.4639 66.2747 15.6734 62.1243L15.6697 62.1223L15.6645 62.1196C13.4664 60.9485 11.2683 59.7774 9.06963 58.6074C7.05951 57.5377 5.46038 56.1441 5.46335 53.6067C4.92119 51.9195 4.31678 50.3172 3.72564 48.75L3.72562 48.75C2.94104 46.67 2.17984 44.652 1.61854 42.5797C-0.0982657 36.2414 -0.677229 29.8101 1.01181 23.2887C4.02684 11.6476 11.6161 4.34039 22.9258 1.46027C36.1016 -1.89506 48.692 0.617167 60.0122 8.11842Z"
                        fill={teamColor.fill}
                    />
                    <path
                        d="M45.6021 78.6882C44.9057 78.3668 41.1827 76.5389 40.283 75.7103L39.0677 74.9258C29.0459 69.6604 19.0627 64.321 9.06879 59.0026C7.05868 57.9329 5.45859 56.3939 5.49178 53.6643C6.72603 54.0059 7.93102 54.6851 9.42161 55.3915C10.4365 55.8346 11.1649 56.1052 12.0033 56.5219C20.947 61.2727 29.781 65.8773 38.7989 70.5779L38.8139 70.5857C39.4374 69.1985 39.8109 68.4271 40.1359 67.6357C43.8096 58.6899 47.5173 49.7576 51.1269 40.786C52.9398 36.28 55.6643 32.5893 59.7968 29.9669L69.5625 23.5599C70.5684 25.6636 69.7908 29.524 67.7324 30.3392C60.0766 33.3709 55.3542 38.3887 52.6286 46.0899C49.7518 54.2183 46.3335 62.158 43.0267 70.1281C42.3081 71.8601 42.6249 73.437 44.2453 74.382C45.6365 75.7262 47.5434 76.6124 49.8264 78.1752C51.6257 79.4378 51.568 79.7047 51.3333 79.7836C51.1378 79.8625 50.9216 80.2665 49.1615 79.714C47.4013 79.1616 45.7977 78.6882 45.6021 78.6882Z"
                        fill="#D9D9D9"
                    />
                    <path
                        d="M63.2862 27.7484L61.1941 29.0572C58.663 26.4735 57.1056 23.7265 54.665 21.5571C46.4126 14.2214 37.0875 9.5451 25.6151 10.5901C20.0624 11.0959 16.0492 14.0482 12.996 18.421C7.60881 26.1366 7.66074 34.7646 9.30125 43.5183C10.1451 48.0212 11.4806 52.3455 12.5526 56.8056C11.8243 56.5351 11.0327 56.1546 10.199 55.7585C9.25733 52.0924 8.35085 48.7749 7.58441 45.2194C5.96648 37.7137 5.43522 30.1588 8.43801 22.9023C13.4533 10.7823 21.9731 6.88559 33.7333 8.86715C45.5694 10.8615 56.0198 18.4375 63.2862 27.7484Z"
                        fill="#AEAFB0"
                    />
                </svg>

                <span
                    className={`absolute text-6xl font-bold ${teamColor.text}`}
                >
                    {player.number}
                </span>
            </div>
            <div className="flex space-x-1 m-0">{renderDots()}</div>
        </li>
    );
};

const RemovalModalInstant = ({
    player,
    onRemove,
    teamColor,
    onRemovalDecrease,
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
        <li className="flex gap-1">
            <button
                onClick={() => onRemove(player.id)}
                disabled={player.removals >= 3}
                className={`w-36  text-left p-2 rounded-l-lg bg-gray-700 hover:bg-gray-600 transition-colors ${
                    player.removals >= 3 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <div className="flex items-center space-x-4">
                    <div className="relative w-[60px] h-[68px] flex justify-center">
                        <svg
                            width="60"
                            height="69"
                            viewBox="0 0 60 69"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M51.4391 6.91937C56.3137 10.1313 59.7065 14.609 59.7031 20.8769C60.3745 23.0982 59.6951 24.2564 57.9307 24.9512C51.3685 27.5352 47.4472 32.3821 45.111 38.9459C43.0562 44.7186 40.6794 50.3797 38.304 56.0371C37.8287 57.1692 37.3534 58.3011 36.8808 59.4338L33.4873 63.5229C26.7895 60.0238 20.1119 56.4863 13.4344 52.9489L13.4311 52.9472L13.4285 52.9458C11.5438 51.9474 9.65913 50.949 7.77397 49.9514C6.05101 49.0397 4.68032 47.8519 4.68287 45.6893C4.21816 44.2513 3.7001 42.8856 3.1934 41.5499L3.19339 41.5499C2.5209 39.7771 1.86843 38.0571 1.38732 36.2909C-0.0842277 30.8887 -0.580482 25.4073 0.867268 19.8491C3.45158 9.92732 9.95663 3.69934 19.6507 1.2446C30.9442 -1.61517 41.736 0.526015 51.4391 6.91937Z"
                                fill={teamColor.fill}
                            />
                            <path
                                d="M39.0875 67.0664C38.4906 66.7925 35.2994 65.2345 34.5283 64.5283L33.4866 63.8597C24.8965 59.372 16.3395 54.8212 7.77324 50.2882C6.05029 49.3765 4.67879 48.0648 4.70724 45.7384C5.76516 46.0295 6.79802 46.6084 8.07566 47.2105C8.94561 47.5882 9.56994 47.8187 10.2885 48.174C17.9546 52.223 25.5266 56.1476 33.2562 60.1539L33.269 60.1606C33.8035 58.9783 34.1236 58.3208 34.4022 57.6462C37.5511 50.0217 40.7291 42.4087 43.8231 34.7621C45.377 30.9217 47.7122 27.776 51.2544 25.541L59.625 20.0803C60.4872 21.8732 59.8207 25.1635 58.0563 25.8582C51.4942 28.4422 47.4465 32.7189 45.1102 39.2827C42.6444 46.2106 39.7145 52.9776 36.8801 59.7706C36.2641 61.2468 36.5356 62.5908 37.9245 63.3962C39.117 64.5419 40.7515 65.2972 42.7084 66.6292C44.2506 67.7053 44.2012 67.9327 44 68C43.8324 68.0673 43.6471 68.4116 42.1384 67.9407C40.6297 67.4699 39.2551 67.0664 39.0875 67.0664Z"
                                fill="#D9D9D9"
                            />
                            <path
                                d="M54.2453 23.6501L52.4521 24.7657C50.2826 22.5635 48.9477 20.2222 46.8558 18.3732C39.7823 12.121 31.7893 8.13534 21.9558 9.026C17.1964 9.45708 13.7565 11.9733 11.1394 15.7004C6.52185 22.2763 6.56636 29.6301 7.97251 37.0909C8.69585 40.9288 9.84054 44.6144 10.7594 48.4157C10.1351 48.1852 9.45664 47.8609 8.74203 47.5233C7.93487 44.3987 7.15788 41.5712 6.50094 38.5407C5.11414 32.1436 4.65877 25.7045 7.2326 19.5198C11.5314 9.18985 18.8341 5.86863 28.9143 7.55752C39.0595 9.2573 48.017 15.7144 54.2453 23.6501Z"
                                fill="#AEAFB0"
                            />
                        </svg>
                        <span
                            className={`absolute text-4xl font-bold ${teamColor.text} py-2`}
                        >
                            {player.number}
                        </span>
                    </div>
                    <div className="flex space-x-1 m-0">{renderDots()}</div>
                </div>
            </button>
            <button
                onClick={() => onRemovalDecrease(player.id)}
                className="w-5  text-left p-2 rounded-r-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
                -
            </button>
        </li>
    );
};
