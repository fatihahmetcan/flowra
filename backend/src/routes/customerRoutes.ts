import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

const router = Router();
const customerController = new CustomerController();

// Customer Routes
router
    .route('/')
    .get(customerController.getAllCustomers)
    .post(customerController.createCustomer);

router
    .route('/:id')
    .get(customerController.getCustomerById)
    .patch(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

export default router;