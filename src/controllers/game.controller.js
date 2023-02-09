import { db } from "../database/db.js";

export async function registerGame(req, res) {
    const game = res.locals.game

    try {

        const checkName = await db.query(`SELECT name FROM games WHERE name = $1;`, [game.name])
        
        if (checkName !== null || checkName !== undefined) {
            res.status(409).send("Já existe um game registrado com este nome")
        } else {
            await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
                [game.name, game.image, game.stockTotal, game.pricePerDay])
            res.status(201).send("Game registrado com sucesso")
        }

    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}
