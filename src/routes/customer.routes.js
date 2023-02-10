import { Router } from 'express'
import { customerSchemaValidation } from '../middlewares/customer.middleware.js'
import { registerCustomer } from '../controllers/customer.controller.js'

const routerCustomers = Router()


routerCustomers.post("/customers", customerSchemaValidation, registerCustomer) 
//routerCustomers.get("/customers", getChoices)

export default routerCustomers