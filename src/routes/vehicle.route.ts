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