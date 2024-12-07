import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Функция для подключения к базе данных
export async function connectToDatabase() {
    return open({
        filename: "./collection.db", // Путь к файлу базы данных
        driver: sqlite3.Database,
    });
}
