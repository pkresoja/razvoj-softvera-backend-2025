import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Invoice } from "../entities/Invoice";

const repo = AppDataSource.getRepository(Invoice)

export class InvoiceService {
    static async getInvoices() {
        return await repo.find({
            select: {
                invoiceId: true,
                createdAt: true,
                generatedAt: true,
                payedAt: true
            },
            where: {
                deletedAt: IsNull()
            },
            relations: {
                vehicle: {
                    client: true,
                    model: true
                }
            }
        })
    }

    static async getInvoiceById(id: number) {
        const data = await repo.findOne({
            where: {
                deletedAt: IsNull()
            },
            relations: {
                vehicle: {
                    client: true,
                    model: true
                },
                invoiceArticles: {
                    article: true
                }
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }
}