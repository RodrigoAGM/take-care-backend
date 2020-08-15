import { Users } from "../service/user.service";
import { Request, Response } from 'express'

const users = new Users()

export async function handleGetUsers(req: Request, res: Response) {
    try {
        const data = await users.get()
        res.send(data.data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}