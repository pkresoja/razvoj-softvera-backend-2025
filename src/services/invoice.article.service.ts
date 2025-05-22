import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { InvoiceArticle } from "../entities/InvoiceArticle";
import { isDefined } from "../utils";
import { ArticleService } from "./article.service";

const repo = AppDataSource.getRepository(InvoiceArticle)

export class InvoiceArticleService {

    static async getInvoiceArticleById(id: number) {
        const data = await repo.findOneBy({
            invoiceArticleId: id,
            deletedAt: IsNull(),
            article: {
                deletedAt: IsNull()
            },
            invoice: {
                deletedAt: IsNull(),
                vehicle: {
                    deletedAt: IsNull(),
                    client: {
                        deletedAt: IsNull()
                    },
                    model: {
                        active: true
                    }
                }
            }
        })

        return isDefined<InvoiceArticle>(data)
    }

    static async getDetailedInvoiceArticleById(id: number) {
        const data = await repo.findOne({
            where: {
                invoiceArticleId: id,
                deletedAt: IsNull(),
                article: {
                    deletedAt: IsNull()
                },
                invoice: {
                    deletedAt: IsNull(),
                    vehicle: {
                        deletedAt: IsNull(),
                        client: {
                            deletedAt: IsNull()
                        },
                        model: {
                            active: true
                        }
                    }
                }
            },
            relations: {
                invoice: {
                    vehicle: {
                        client: true,
                        model: true
                    }
                },
                article: true
            }
        })

        return isDefined<InvoiceArticle>(data)
    }

    static async createInvoiceArticle(model: InvoiceArticle) {

        if (model.discount < 0 || model.discount > 100)
            throw new Error("DISCOUNT_OUT_OF_BOUNDS")

        if (model.price < 0)
            throw new Error("PRICE_MUST_BE_A_POSITIVE_NUMBER")

        await repo.save({
            invoiceId: model.invoiceId,
            articleId: model.articleId,
            discount: model.discount,
            price: model.price,
            createdAt: new Date()
        })
    }

    static async updateInvoiceArticle(id: number, model: InvoiceArticle) {
        const invoiceArticle = await this.getInvoiceArticleById(id)
        invoiceArticle.articleId = model.articleId
        invoiceArticle.price = model.price
        invoiceArticle.discount = model.discount
        invoiceArticle.updatedAt = new Date()
        await repo.save(invoiceArticle)
    }

    static async deleteInvoiceArticle(id: number) {
        const invoiceArticle = await this.getInvoiceArticleById(id)
        invoiceArticle.deletedAt = new Date()
        await repo.save(invoiceArticle)
    }
}