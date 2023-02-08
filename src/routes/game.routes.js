import { Router } from 'express'

const routerGames = Router()


routerGames.post("/games", choiceSchemaValidation, registerChoice) 
routerGames.get("/games", getChoices)

export default routerGames