import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

// Функция для установления подключения к базе данных
async function connectToDatabase() {
    if (!db) {
        try {
            db = await open({
                filename: "./collection.db",
                driver: sqlite3.Database,
            });
            console.log("Database connection established.");
        } catch (error) {
            console.error("Database connection error:", error);
            throw new Error("Failed to connect to database");
        }
    }
}

// Обработчик API
export default async function handler(req, res) {
    try {
        // Установить соединение с базой данных
        await connectToDatabase();

        // Определить обработку по методу запроса
        switch (req.method) {
            case "GET": {
                try {
                    // Выполняем запрос к таблице competitions для получения названий
                    const competition = await db.all(`
                        SELECT name AS name
                        FROM competitions
                    `);

                    // Возвращаем результат в формате JSON
                    res.status(200).json(competition);
                } catch (error) {
                    console.error("Database query error:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                }
                break;
            }

            case "PUT": {
                try {
                    const { id, name } = req.body;

                    // Проверяем, переданы ли необходимые параметры
                    if (!id || !name) {
                        return res.status(400).json({
                            error: "ID and name are required",
                        });
                    }

                    // Выполняем обновление данных
                    const result = await db.run(
                        `UPDATE competitions SET name = ? WHERE id = ?`,
                        [name, id]
                    );

                    // Проверяем, были ли обновлены строки
                    if (result.changes === 0) {
                        return res
                            .status(404)
                            .json({ error: "Competition not found" });
                    }

                    res.status(200).json({
                        message: "Competition updated successfully",
                    });
                } catch (error) {
                    console.error("Database update error:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                }
                break;
            }

            default: {
                // Если метод не поддерживается, возвращаем 405
                res.status(405).json({ error: "Method not allowed" });
                break;
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}
