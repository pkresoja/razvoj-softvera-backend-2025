import { Router } from "express"
import { VehicleService } from "../services/vehicle.service"
import { errorReponse } from "../utils"

export const VehicleRoute = Router()

VehicleRoute.get('/client/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        const search = req.query.search as string
        res.json(await VehicleService.getVehicleByClientId(id, search))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

VehicleRoute.get('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await VehicleService.getVehicleById(id))
    } catch (e: any) {
        errorReponse(res, e)
    }
})

VehicleRoute.post('/', async (req, res) => {
    try {
        await VehicleService.createVehicle(req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

VehicleRoute.put('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await VehicleService.updateVehicle(id, req.body)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})

VehicleRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await VehicleService.deleteVehicle(id)
        res.status(204).send()
    } catch (e: any) {
        errorReponse(res, e)
    }
})