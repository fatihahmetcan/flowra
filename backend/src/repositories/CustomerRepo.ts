import { prisma } from '../config/prisma';
import { Prisma, Customer } from '@prisma/client';

export class CustomerRepo {

    // Create a new custromer
    async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
        return prisma.customer.create({ data });
    }

    // Finds all customers with optional filtyering, sorting and pagination
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.CustomerWhereInput;
        orderBy?: Prisma.CustomerOrderByWithRelationInput;
    }): Promise<{ items: Customer[]; total: number}> {
        const { skip, take, where, orderBy } = params;

        const [items, total] = await prisma.$transaction([
            prisma.customer.findMany({
                skip, 
                take,
                where,
                orderBy,
            }),
            prisma.customer.count({ where })
        ]);

        return { items, total };
    }

    // Find customer by uuid
    async findById(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: { id },
            include: {
                projects: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
            },
        });
    }

    // Update an existing customer record by ID
    async update(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
        return prisma.customer.update({
            where: { id },
            data,
        });
    }

    // Delete a customer record by ID
    async delete(id: string): Promise<Customer> {
        return prisma.customer.delete({
            where: { id },
        });
    }



}