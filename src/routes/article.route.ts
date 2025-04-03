import { Router } from "express";
import { errorReponse } from "../utils";
import { ArticleService } from "../services/article.service";

export const ArticleRoute = Router()

ArticleRoute.get('/', async (req, res) => {
    try {
        const search = req.query.search as string
        res.json(await ArticleService.getArticles(search))
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

ArticleRoute.post('/', async (req, res) => {
    try {
        await ArticleService.createArticle(req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ArticleRoute.put('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await ArticleService.updateArticle(id, req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ArticleRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await ArticleService.deleteArticle(id)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})