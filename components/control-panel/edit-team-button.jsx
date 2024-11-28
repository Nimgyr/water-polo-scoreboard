import React, { useState } from "react";

export function EditTeamButton({ setTeamNameMain, team, teamNameMain }) {
    const [isOpen, setIsOpen] = useState(false);
    const [teamName, setTeamName] = useState("");

    const toggleInput = () => {
        setIsOpen(!isOpen);
        if (isOpen && teamName) {
            setTeamNameMain(teamName);
        }
    };

    const handleChange = (e) => {
        let input = e.target.value;

        setTeamName(input); // Обновляем состояние
    };

    const teamClassName = {
        white: "text-white text-clampText whitespace-nowrap",
        blue: "text-blue-600 text-clampText whitespace-nowrap",
    }[team];

    return (
        <>
            {isOpen ? <></> : <h1 className={teamClassName}>{teamNameMain}</h1>}

            <div className="flex items-center space-x-4">
                {/* Кнопка для открытия поля ввода */}
                <button onClick={toggleInput} className="h-[41.6px] w-[36px]">
                    {isOpen ? (
                        <svg
                            className="size-[4vw] max-w-5 max-h-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z"
                                fill="white"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="size-[4vw] max-w-5 max-h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16px"
                            height="16px"
                            fill="white"
                        >
                            <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z" />
                        </svg>
                    )}
                </button>

                {/* Поле ввода с анимацией */}
                <div
                    className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "w-44 opacity-100" : "w-0 opacity-0"
                    }`}
                >
                    <input
                        type="text"
                        value={teamName}
                        onChange={handleChange}
                        placeholder="Название команды"
                        className="w-44 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-amber-400 bg-slate-600 hover:bg-slate-400"
                    />
                </div>
            </div>
        </>
    );
}
