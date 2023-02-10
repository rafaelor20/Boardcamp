import { Router } from 'express'
import { customerSchemaValidation } from '../middlewares/customer.middleware.js'
import { registerCustomer, listCustomers, getCustomer } from '../controllers/customer.controller.js'

const routerCustomers = Router()


routerCustomers.post("/customers", customerSchemaValidation, registerCustomer) 
routerCustomers.get("/customers", listCustomers)
routerCustomers.get("/customers/:id", getCustomer)

export default routerCustomers