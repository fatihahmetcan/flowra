import { CustomerRepo } from "../repositories/CustomerRepo";
import { AppError } from "../utils/AppError";
import { Prisma, Customer } from "@prisma/client";
import { prisma } from "../config/prisma";

export class CustomerService {
    private customerRepo: CustomerRepo;

    constructor() {
        this.customerRepo = new CustomerRepo();
    }

    // Create a new customer with a unique business code.
    async createCustomer(data: Omit<Prisma.CustomerCreateInput, 'customerCode'>): Promise<Customer> {
        // 1 Check if customer with this email already exist
        const existing = await this.customerRepo.findAll({
            where: { email: data.email },
        });

        if (existing.total > 0) {
            throw new AppError('A customer with this email already exist', 409);
        }

        return prisma.$transaction(async (tx) => {
            // 2. Generate the unique customer code
            const nextValResult = await tx.$queryRaw<{ nextval: bigint }[]>`
                SELECT nextval('customer_code_seq') AS nextval
            `;

            const nextId = Number(nextValResult[0].nextval);
            const formattedCode = `C-${nextId.toString().padStart(6, '0')}`;

            // 3. Save to database
            return tx.customer.create({
                data: {
                    ...data,
                    customerCode: formattedCode,
                },
            });
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
                throw new AppError('This email is already in use by another customer', 409);
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
