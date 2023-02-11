import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function registerRental(req, res) {
    const rentalInfo = res.locals.rental

    try {
        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE "id" = $1`, [rentalInfo.gameId])
        
        if (pricePerDay.rows.length > 0) {
            const rental = {
                customerId: rentalInfo.customerId,
                gameId: rentalInfo.gameId,
                rentDate: dayjs().format('YYYY-MM-DD'),
                daysRented: rentalInfo.daysRented,
                returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
                originalPrice: pricePerDay.rows[0].pricePerDay * rentalInfo.daysRented,    // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
                delayFee: null
            }

            console.log(rental)

            await db.query(`INSERT INTO rentals (
                "customerId",
                "gameId",
                "rentDate",
                "daysRented",
                "returnDate",          
                "originalPrice",    
                "delayFee") 
                VALUES 
                ($1, $2, $3, $4, $5, $6, $7);`,
                [rental.customerId,
                rental.gameId,
                rental.rentDate,
                rental.daysRented,
                rental.returnDate,
                rental.originalPrice,
                rental.delayFee])
            res.status(201).send("Aluguel registrado com sucesso")

        } else {
            res.status(400).send("Este aluguel não tem um jogo equivalente")
        }


    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}