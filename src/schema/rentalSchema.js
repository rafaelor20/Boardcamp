import joi from "joi"

export const rentalSchema = joi.object({
    customerId: joi.string().required(),
    gameId: joi.string().required(),
    daysRented: joi.number().required(),
})