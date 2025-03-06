import { Router } from "express";
import { ClientService } from "../services/client.service";
import { errorReponse } from "../utils";

export const ClientRoute = Router()

ClientRoute.get('/', async (req, res) => {
    try {
        res.json(await ClientService.getClients())
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