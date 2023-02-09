import { gameSchema } from "../schema/gameSchema.js"

export function gameSchemaValidation(req, res, next) {
    const game = {
        name: req.body.name,
        image: req.body.image,
        stockTotal: Number(req.body.stockTotal),
        pricePerDay: Number(req.body.pricePerDay)
    }

    const { error } = gameSchema.validate(game, { abortEarly: false })

    if (error) {

        const errorMessages = error.details.map(detail => detail.message)
        return res.status(400).send(errorMessages)
    }

    res.locals.game = game
    next()
}