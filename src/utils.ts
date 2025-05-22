import type { Response } from "express";

export function errorReponse(rsp: Response, e: Error = new Error("BAD_REQUEST")) {
    const msg = e.message
    rsp.status(msg == "NOT_FOUND" ? 404 : 400).json({
        message: msg,
        timestamp: new Date()
    })
}

export function isDefined<T>(data: T | null) {
    if (data == null)
        throw new Error('NOT_FOUND')

    return data
}