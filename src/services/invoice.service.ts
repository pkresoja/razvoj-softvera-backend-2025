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
            },
            where: {
                vehicleId: vehcile,
                deletedAt: IsNull()
            }
        })
    }

    static async getInvoiceById(id: number) {
        const data = await repo.findOne({
            where: {
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }

    static async updateInvoice(id: number, model: Invoice) {
        const inv = await this.getInvoiceById(id)
        console.log(model.vehicleId)
        inv.vehicleId = model.vehicleId
        inv.updatedAt = new Date()
        console.log(await repo.save(inv))
    }

    static async deleteInvoice(id: number) {
        const inv = await this.getInvoiceById(id)
        inv.deletedAt = new Date()
        repo.save(inv)
    }
}