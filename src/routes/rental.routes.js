import { Router } from 'express'
import { rentalSchemaValidation } from '../middlewares/rental.middleware.js'
import { registerRental } from '../controllers/rental.controller.js'

const routerRentals = Router()


routerRentals.post("/rentals", rentalSchemaValidation, registerRental) 
//routerRentals.get("/games", getChoices)

export default routerRentals