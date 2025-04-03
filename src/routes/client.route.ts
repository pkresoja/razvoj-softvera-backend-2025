import { Router } from "express";
import { ClientService } from "../services/client.service";
import { errorReponse } from "../utils";

export const ClientRoute = Router()

ClientRoute.get('/', async (req, res) => {
    try {
        const search = req.query.search as string
        res.json(await ClientService.getClients(search))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ClientRoute.get('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await ClientService.getClientById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ClientRoute.post('/', async (req, res) => {
    try {
        await ClientService.createClient(req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ClientRoute.put('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await ClientService.updateClient(id, req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

ClientRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await ClientService.deleteClient(id)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})