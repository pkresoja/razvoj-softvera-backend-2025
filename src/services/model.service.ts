import { AppDataSource } from "../db";
import { Model } from "../entities/Model";

const repo = AppDataSource.getRepository(Model)

export class ModelService {
    static async getModels() {
        return await repo.find({
            select: {
                modelId: true,
                name: true
            },
            where: {
                active: true
            }
        })
    }
}