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

    static async getVehicleById(id: number) {
        const data = await repo.findOne({
            where: {
                vehicleId: id,
                client: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error('VEHICLE_NOT_FOUND')

        return data
    }

    static async createVehicle(model: Vehicle) {
        await repo.save({
            clientId: model.clientId,
            modelId: model.modelId,
            regPlate: model.regPlate,
            vin: model.vin,
            year: model.year,
            createdAt: new Date()
        })
    }

    static async updateVehicle(id: number, model: Vehicle) {
        const vehicle = await this.getVehicleById(id);
        vehicle.clientId = model.clientId
        vehicle.modelId = model.modelId
        vehicle.regPlate = model.regPlate
        vehicle.vin = model.vin
        vehicle.year = model.year
        vehicle.updatedAt = new Date()
        await repo.save(vehicle)
    }

    static async deleteVehicle(id: number) {
        const vehicle = await this.getVehicleById(id);
        vehicle.deletedAt = new Date()
        await repo.save(vehicle)
    }
}