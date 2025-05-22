import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Invoice } from "../entities/Invoice";

const repo = AppDataSource.getRepository(Invoice)

export class InvoiceService {
    static async getInvoicesByVehicleId(vehcile: number) {
        return await repo.find({
            select: {
                invoiceId: true,
                createdAt: true,
                updatedAt: true,
                generatedAt: true,
                paidAt: true,
                invoiceArticles: {
                    invoiceArticleId: true,
                    price: true,
                    discount: true
                }
            },
            where: {
                vehicleId: vehcile,
                deletedAt: IsNull()
            },
            relations: {
                invoiceArticles: true
            }
        })
    }

    static async getInvoiceDetailsById(id: number) {
        const data = await repo.findOne({
            where: {
                invoiceId: id,
                deletedAt: IsNull()
            },
            relations: {
                invoiceArticles: {
                    article: true
                },
                vehicle: {
                    model: true,
                    client: true
                }
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        data.invoiceArticles = data.invoiceArticles.filter(ia => ia.deletedAt == null)
        return data
    }

    static async getInvoiceById(id: number) {
        const data = await repo.findOne({
            where: {
                invoiceId: id,
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }

    static async createInvoice(model: Invoice) {
        await repo.save({
            vehicleId: model.vehicleId,
            createdAt: new Date()
        })
    }

    static async updateInvoice(id: number, model: Invoice) {
        const inv = await this.getInvoiceById(id)
        inv.vehicleId = model.vehicleId
        inv.updatedAt = new Date()
        await repo.save(inv)
    }

    static async deleteInvoice(id: number) {
        const inv = await this.getInvoiceById(id)
        inv.deletedAt = new Date()
        repo.save(inv)
    }
}