import { db } from "../database/db.js";

export async function registerGame(req, res){
    const game = res.locals.game
    console.log(game)
    try {
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [game.name, game.image, game.stockTotal, game.pricePerDay])
        res.status(201).send("Enquete registrada com sucesso")
    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}
