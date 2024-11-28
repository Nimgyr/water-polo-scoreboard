import React, { useState } from "react";
import { UiButton } from "./ui-button";

export function EditButton({ setstart, setstartFrom }) {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState("");

    const toggleInput = () => {
        setIsOpen(!isOpen);
        if (isOpen && time) {
            setstart(timeToMiliseconds());
            setstartFrom(timeToMiliseconds());
        }
    };

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // Удаляем всё, что не является цифрой
        if (input.length > 4) {
            input = input.slice(0, 4); // Ограничиваем ввод только четырьмя цифрами
        }

        if (input.length > 2) {
            input = input.slice(0, 2) + ":" + input.slice(2); // Добавляем двоеточие после двух цифр
        }

        setTime(input); // Обновляем состояние
    };

    const timeToMiliseconds = () => {
        // Разделяем строку по символу ":"
        const [minutes, secunds] = time.split(":");

        // Преобразуем полученные строки в числа
        const seconds = parseInt(secunds, 10) * 1000; // Секунды переводим в миллисекунды
        const minutesInSeconds = parseInt(minutes, 10) * 60000; // Минуты переводим в миллисекунды

        // Возвращаем общее количество секунд
        return seconds + minutesInSeconds;
    };

    return (
        <div className="flex items-center space-x-4">
            <UiButton
                onClick={toggleInput}
                variant="secondary"
                size="sm"
                className="h-[44px] w-[44px]"
            >
                {isOpen ? (
                    <svg
                        className="size-[4vw] max-w-8 max-h-8"
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
                        className="size-[4vw] max-w-8 max-h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16px"
                        height="16px"
                        fill="white"
                    >
                        <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z" />
                    </svg>
                )}
            </UiButton>

            {/* Поле ввода с анимацией */}
            <div
                className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "w-20 opacity-100" : "w-0 opacity-0"
                }`}
            >
                <input
                    type="text"
                    value={time}
                    onChange={handleChange}
                    maxLength="5"
                    placeholder="мм:сс"
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-amber-400 bg-slate-600 hover:bg-slate-400"
                />
            </div>
        </div>
    );
}
