import { Request, Response, NextFunction } from "express";
import { TokenRequest } from "../model/request";


export function authenticateRole(role: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const tokenRequest = req as TokenRequest

        if (tokenRequest.user.role != role) {
            return res.status(403).send('You do not have the permission to get this data.')
        }

        next()
    }
}