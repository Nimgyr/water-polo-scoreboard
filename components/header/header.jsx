import Image from "next/image";
import LogoSrc from "./logo.svg";

export function Header({
    openSecondWindow,
    resetGame,
    toggleTimeOut,
    isTimeOut,
}) {
    return (
        <header className="flex h-10 items-center px-8 bg-white shadow-lg">
            <Image
                className="h-6 hover:h-7 transition-all"
                src={LogoSrc}
                alt="logo"
            />
            <div className="ml-auto flex gap-10">
                <button className="flex items-center font-semibold text-deepBlue hover:text-blue-500 transition-colors">
                    Начать соревнования
                </button>
                <button
                    onClick={toggleTimeOut}
                    className="flex items-center font-semibold text-deepBlue hover:text-blue-500 transition-colors"
                >
                    {isTimeOut ? "Период" : "Тайм-аут"}
                </button>
                <button
                    onClick={resetGame}
                    className="flex items-center font-semibold text-deepBlue hover:text-blue-500 transition-colors"
                >
                    Новая игра
                </button>
                <button
                    onClick={openSecondWindow}
                    className="flex items-center font-semibold text-deepBlue hover:text-blue-500 transition-colors"
                >
                    Табло
                </button>
            </div>
        </header>
    );
}
