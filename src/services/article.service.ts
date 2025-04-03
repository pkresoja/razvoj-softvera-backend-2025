import { Equal, IsNull, Like } from "typeorm"
import { AppDataSource } from "../db"
import { Article } from "../entities/Article"

const repo = AppDataSource.getRepository(Article)

export class ArticleService {
    static async getArticles(search: string) {
        return await repo.find({
            select: {
                articleId: true,
                name: true,
                partNumber: true,
                price: true
            },
            where: [
                {
                    name: Like(`%${search}%`),
                    deletedAt: IsNull()
                },
                {
                    partNumber: Like(`%${search}%`),
                    deletedAt: IsNull()
                }
            ]
        })
    }

    static async getArticleById(id: number) {
        const data = await repo.findOne({
            where: {
                articleId: id,
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error('NOT_FOUND')

        return data
    }

    static async createArticle(model: Article) {
        await repo.save({
            name: model.name,
            partNumber: model.partNumber == '' ? null : model.partNumber,
            price: model.price,
            createdAt: new Date()
        })
    }

    static async updateArticle(id: number, model: Article) {
        const data = await this.getArticleById(id)
        data.name = model.name
        data.partNumber = model.partNumber == '' ? null : model.partNumber
        data.price = model.price
        data.updatedAt = new Date()

        await repo.save(data)
    }

    static async deleteArticle(id: number) {
        const data = await this.getArticleById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}