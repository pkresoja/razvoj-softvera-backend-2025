import { IsNull, Like } from "typeorm";
import { AppDataSource } from "../db";
import { Vehicle } from "../entities/Vehicle";

const repo = AppDataSource.getRepository(Vehicle)

export class VehicleService {
    static async getVehicleByClientId(id: number, search: string) {
        return await repo.find({
            select: {
                vehicleId: true,
                clientId: true,
                model: {
                    modelId: true,
                    name: true
                },
                vin: true,
                regPlate: true,
                year: true
            },
            where: [
                {
                    clientId: id,
                    client: {
                        deletedAt: IsNull()
                    },
                    vin: Like(`%${search}%`),
                    deletedAt: IsNull()
                },
                {
                    clientId: id,
                    client: {
                        deletedAt: IsNull()
                    },
                    regPlate: Like(`%${search}%`),
                    deletedAt: IsNull()
                },
                {
                    clientId: id,
                    client: {
                        deletedAt: IsNull()
                    },
                    model: {
                        name: Like(`%${search}%`)
                    },
                    deletedAt: IsNull()
                }
            ],
            relations: {
                model: true
            }
        })
    }
}