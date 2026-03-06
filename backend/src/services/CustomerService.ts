import { CustomerRepo } from "../repositories/CustomerRepo";
import { AppError } from "../utils/AppError";
import { Prisma, Customer } from "@prisma/client";

export class CustomerService {
    private customerRepo: CustomerRepo;

    constructor() {
        this.customerRepo = new CustomerRepo();
    }

    // Generate the next customer code (e.g., C-000001)
    private async generateCustomerCode(): Promise<string> {
        const customers = await this.customerRepo.findAll({
            take: 1,
            orderBy: { customerCode: 'desc' },
        });

        if (customers.items.length === 0) return 'C-000001';

        const lastCode = customers.items[0].customerCode; // e.g., "C-000042"
        const lastNumber = parseInt(lastCode.split('-')[1], 10);
        const nextNumber = lastNumber + 1;

        return `C-${nextNumber.toString().padStart(6, '0')}`;
    }

    // Create a new customer with a unique business code.
    async createCustomer(data: Omit<Prisma.CustomerCreateInput, 'customerCode'>): Promise<Customer> {
        // 1 Check if customer with this email already exist
        const existing = await this.customerRepo.findAll({
            where: { email: data.email },
        });

        if (existing.total > 0) {
            throw new AppError('A customer with this email already exist', 400);
        }

        // 2. Generate the unique customer code
        const customerCode = await this.generateCustomerCode();

        // 3. Save to database via Repo
        return this.customerRepo.create({
            ...data,
            customerCode,
        });
    }

    // Retrieves all customers with pagination and optional search.
    async getAllCustomers(page: number = 1, limit: number = 10, search?: string) {
        const skip = (page - 1) * limit;

        const where: Prisma.CustomerWhereInput = search ? {
            OR: [
                {companyName: { contains: search, mode: 'insensitive'}},
                {firstName: {contains: search, mode: 'insensitive'}},
                {lastName: {contains: search, mode: 'insensitive'}},
                {email: {contains: search, mode: 'insensitive'}},
            ]
        } : {};

        return this.customerRepo.findAll({
            skip,
            take: limit,
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    // Gets a single customer by ID or throws a 404
    async getCustomerById(id: string): Promise<Customer> {
        const customer = await this.customerRepo.findById(id);

        if(!customer) {
            throw new AppError('Customer not found with the provided ID', 404);
        }

        return customer;
    }

    // Update an existing customer record
    async updateCustomer(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {

        const customer = await this.customerRepo.findById(id);
        if (!customer) {
            throw new AppError('No customer found with that ID', 404);
        }

        if (data.email && typeof data.email === 'string') {
            const existing= await this.customerRepo.findAll({
                where: {
                    email: data.email,
                    NOT: { id: id }
                },
            });

            if (existing.total > 0) {
                throw new AppError('This email is already in use by another customer', 404);
            }
        }

        return this.customerRepo.update(id, data);
    }

    // Deletes a customer record
    async deleteCustomer(id: string): Promise<void> {
        const customer = await this.customerRepo.findById(id);
        
        if (!customer) {
            throw new AppError('No customer found with that ID', 404);
        }

        // Note: Later add checks here to prevent deletion
        // if customer has active projects or unpaid inovices.
        await this.customerRepo.delete(id);
    }
}