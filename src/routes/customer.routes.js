import { Router } from 'express'

const routerCustomers = Router()


routerCustomers.post("/games", choiceSchemaValidation, registerChoice) 
routerCustomers.get("/games", getChoices)

export default routerCustomers