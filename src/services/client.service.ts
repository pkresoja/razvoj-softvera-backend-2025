import { IsNull, Like } from "typeorm";
import { AppDataSource } from "../db";
import { Client } from "../entities/Client";

const repo = AppDataSource.getRepository(Client)

export class ClientService {
    static async getClients(search: string) {
        return await repo.find({
            select: {
                clientId: true,
                name: true,
                phone: true,
                email: true,
                taxId: true
            },
            where: [
                {
                    name: Like(`%${search}%`),
                    deletedAt: IsNull()
                },
                {
                    email: Like(`%${search}%`),
                    deletedAt: IsNull()
                },
                {
                    phone: Like(`%${search}%`),
                    deletedAt: IsNull()
                },
                {
                    taxId: Like(`%${search}%`),
                    deletedAt: IsNull()
                }
            ]
        })
    }

    static async getClientById(id: number) {
        const data = await repo.findOne({
            where: {
                clientId: id,
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }

    static async createClient(model: Client) {
        if (model.name === '' || model.email === '' || model.phone === '') {
            throw new Error('EMAIL_NAME_OR_PHONE_NOT_SET')
        }

        await repo.save({
            name: model.name,
            email: model.email,
            phone: model.phone,
            taxId: model.taxId === '' ? null : model.taxId,
            createdAt: new Date()
        })
    }

    static async updateClient(id: number, model: Client) {
        const data = await this.getClientById(id)
        data.name = model.name
        data.email = model.email
        data.phone = model.phone
        data.taxId = model.taxId === '' ? null : model.taxId
        data.updatedAt = new Date()
        await repo.save(data)
    }

    static async deleteClient(id: number) {
        const data = await this.getClientById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}