import { Router } from 'express'
import { rentalSchemaValidation } from '../middlewares/rental.middleware.js'
import { registerRental, listRentals } from '../controllers/rental.controller.js'

const routerRentals = Router()


routerRentals.post("/rentals", rentalSchemaValidation, registerRental) 
routerRentals.get("/rentals", listRentals)

export default routerRentals