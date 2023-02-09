import { Router } from 'express'
import { gameSchemaValidation } from '../middlewares/game.middleware.js'
import { registerGame } from '../controllers/game.controller.js'

const routerGames = Router()


routerGames.post("/games", gameSchemaValidation, registerGame) 
routerGames.get("/games")

export default routerGames