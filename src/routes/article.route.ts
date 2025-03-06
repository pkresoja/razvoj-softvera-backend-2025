import { Router } from "express";
import { errorReponse } from "../utils";
import { ArticleService } from "../services/article.service";

export const ArticleRoute = Router()

ArticleRoute.get('/', async (req, res) => {
    try {
        res.json(await ArticleService.getArticles())
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ArticleRoute.get('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await ArticleService.getArticleById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})