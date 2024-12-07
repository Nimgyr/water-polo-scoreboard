import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

// Обработчик GET и PUT запросов для работы с названиями команд
export default async function handler(req, res) {
    if (!db) {
        try {
            db = await open({
                filename: "./collection.db",
                driver: sqlite3.Database,
            });
            console.log("Database connection established.");
        } catch (error) {
            console.error("Database connection error:", error);
            return res
                .status(500)
                .json({ error: "Failed to connect to database" });
        }
    }

    switch (req.method) {
        case "GET":
            try {
                // Выполняем запрос к таблице teams для получения названий команд и их ID
                const teams = await db.all(`
                    SELECT id AS id, name AS name
                    FROM teams
                `);

                // Возвращаем результат в формате JSON
                res.status(200).json(teams);
            } catch (error) {
                console.error("Database query error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            break;

        case "PUT":
            const { teams } = req.body;

            if (
                !Array.isArray(teams) ||
                teams.some((team) => !team.id || !team.name)
            ) {
                return res.status(400).json({
                    error: "Invalid input data. Expecting an array of objects with 'id' and 'name' properties.",
                });
            }

            try {
                // Начинаем транзакцию для синхронизации данных
                await db.exec("BEGIN TRANSACTION");

                // Получаем список текущих ID из базы
                const existingTeams = await db.all("SELECT id FROM teams");
                const existingIds = existingTeams.map((team) => team.id);

                // Составляем списки для удаления, обновления и добавления
                const incomingIds = teams.map((team) => team.id);

                const idsToDelete = existingIds.filter(
                    (id) => !incomingIds.includes(id)
                );
                const teamsToUpdate = teams.filter((team) =>
                    existingIds.includes(team.id)
                );
                const teamsToInsert = teams.filter(
                    (team) => !existingIds.includes(team.id)
                );

                // Удаляем отсутствующие записи
                if (idsToDelete.length > 0) {
                    const placeholders = idsToDelete.map(() => "?").join(", ");
                    await db.run(
                        `DELETE FROM teams WHERE id IN (${placeholders})`,
                        idsToDelete
                    );
                }

                // Обновляем существующие записи
                const updateQuery = `UPDATE teams SET name = ? WHERE id = ?`;
                for (const team of teamsToUpdate) {
                    await db.run(updateQuery, [team.name, team.id]);
                }

                // Добавляем новые записи
                const insertQuery = `INSERT INTO teams (id, name) VALUES (?, ?)`;
                for (const team of teamsToInsert) {
                    await db.run(insertQuery, [team.id, team.name]);
                }

                // Завершаем транзакцию
                await db.exec("COMMIT");

                res.status(200).json({
                    message: "Teams synchronized successfully.",
                });
            } catch (error) {
                // Откатываем изменения в случае ошибки
                await db.exec("ROLLBACK");
                console.error("Database synchronization error:", error);
                res.status(500).json({ error: "Failed to synchronize teams." });
            }
            break;

        default:
            // Возвращаем 405, если метод запроса не поддерживается
            res.status(405).json({ error: "Method not allowed" });
            break;
    }
}
