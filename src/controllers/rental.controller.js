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

export async function listRentals(req, res){
    try {

        const rentals = await db.query(`SELECT * FROM rentals;`)
        const games = await db.query(`SELECT * FROM games;`)
        const customers = await db.query(`SELECT * FROM customers;`)
        
        const rentalsList = []
        for (const elem of rentals.rows){
            let game = await db.query(`SELECT * FROM games WHERE id = $1;`, [Number(elem.gameId)])
            let customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [Number(elem.customerId)])
            elem.customer = customer.rows[0]
            elem.game = game.rows[0]
           
            rentalsList.push(elem)
        }

        res.status(200).send(rentalsList)

    }
    catch (error) {

        console.error(error)
        res.status(500).send("Houve um problema no servidor")

    }
}