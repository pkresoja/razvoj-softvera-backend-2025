import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Client } from "../entities/Client";

const repo = AppDataSource.getRepository(Client)

export class ClientService {
    static async getClients() {
        return await repo.find({
            select: {
                clientId: true,
                name: true,
                phone: true,
                email: true,
                taxId: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getClientById(id: number) {
        const data = await repo.findOne({
            where: {
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }
}