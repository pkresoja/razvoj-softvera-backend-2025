import { Router } from "express"
import { errorReponse } from "../utils"
import { ModelService } from "../services/model.service"

export const ModelRoute = Router()

ModelRoute.get('/', async (req, res) => {
    try {
        res.json(await ModelService.getModels())
    } catch (e: any) {
        errorReponse(res, e)
    }
})