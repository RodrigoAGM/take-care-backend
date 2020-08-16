import { Users } from "../service/user.service";
import { Request, Response } from 'express'
import { User } from "../model/user";

const users = new Users()

export async function handleGetUsers(req: Request, res: Response) {
    try {
        const data = await users.get()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddUsers(req: Request, res: Response){
    try {
        const user:User = req.body
        const data = await users.add(user);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}