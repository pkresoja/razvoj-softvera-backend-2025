import { Router } from "express";
import { errorReponse } from "../utils";
import { InvoiceService } from "../services/invoice.service";
import { InvoiceArticleService } from "../services/invoice.article.service";

export const InvoiceRoute = Router()

InvoiceRoute.get('/vehicle/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await InvoiceService.getInvoicesByVehicleId(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.get('/article/:id/details', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await InvoiceArticleService.getDetailedInvoiceArticleById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.get('/article/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await InvoiceArticleService.getInvoiceArticleById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.get('/:id/details', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await InvoiceService.getInvoiceDetailsById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.get('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await InvoiceService.getInvoiceById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.post('/', async (req, res) => {
    try {
        await InvoiceService.createInvoice(req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.post('/article', async (req, res) => {
    try {
        await InvoiceArticleService.createInvoiceArticle(req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.put('/article/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await InvoiceArticleService.updateInvoiceArticle(id, req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.put('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await InvoiceService.updateInvoice(id, req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.delete('/article/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await InvoiceArticleService.deleteInvoiceArticle(id)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

InvoiceRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await InvoiceService.deleteInvoice(id)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})