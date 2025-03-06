import { IsNull } from "typeorm"
import { AppDataSource } from "../db"
import { Article } from "../entities/Article"

const repo = AppDataSource.getRepository(Article)

export class ArticleService {
    static async getArticles() {
        return await repo.find({
            select: {
                articleId: true,
                name: true,
                partNumber: true,
                price: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getArticleById(id: number) {
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