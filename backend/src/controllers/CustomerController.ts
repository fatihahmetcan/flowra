import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";
import { catchAsync } from "../utils/catchAsync";

export class CustomerController {
    private customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    // POST /customers
    // Creates a new customer record
    public createCustomer = catchAsync(async (req: Request, res: Response) => {
        const customer = await this.customerService.createCustomer(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                customer,
            },
        });
    });

    // GET /customers
    // Retrieves a paginated and searchable list od customers.
    public getAllCustomers = catchAsync(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;
        const search = req.query.search as string;

        const result = await this.customerService.getAllCustomers(page, limit, search);

        res.status(200).json({
            status: 'success',
            results: result.items.length,
            total: result.total,
            data: {
                customers: result.items,
            },
        });
    });

    // GET /customers/:id
    // Retrieves a single customer by their technical ID.
    public getCustomerById = catchAsync(async (req: Request, res:Response) => {
        const customer = await this.customerService.getCustomerById(req.params.id as string);

        res.status(200).json({
            status: 'success',
            data: {
                customer,
            },
        });
    });

    // PATCH /customer/:id
    // Updates an existing customer record.
    public updateCustomer = catchAsync(async (req: Request, res: Response) => {
        const customer = await this.customerService.updateCustomer(req.params.id as string, req.body);

        res.status(200).json({
            status: 'succcess',
            data: {
                customer,
            },
        });
    });

    // DELETE /customer/:id
    // Removes a customer record from the database.
    public deleteCustomer = catchAsync(async ( req: Request, res: Response) => {
        await this.customerService.deleteCustomer(req.params.id as string);

        // 204 No Content is the standard for successful deletions
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
}