import { Router } from 'express'
import { customerSchemaValidation } from '../middlewares/customer.middleware.js'
import { registerCustomer, listCustomers } from '../controllers/customer.controller.js'

const routerCustomers = Router()


routerCustomers.post("/customers", customerSchemaValidation, registerCustomer) 
routerCustomers.get("/customers", listCustomers)

export default routerCustomers