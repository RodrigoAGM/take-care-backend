import { Users } from "../service/user.service";
import { Request, Response } from 'express'
import { User } from "../model/user";

const users = new Users()

export async function handleGetUsers(req: Request, res: Response) {
    try {
        const data = await users.get()

        //Handle hide password
        let usersList : User[] = data.data as User[]
        
        usersList.forEach((user, i) => {
            delete user.password
        })

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

        //Handle hide password
        let usersObj : User = data.data as User
        delete usersObj.password

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllUsers(req: Request, res: Response){
    try {
        const data = await users.deleteAll();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteUsers(req: Request, res: Response){
    try {
        const id = req.params.id
        const data = await users.delete(id);

        //Handle hide password
        let usersList : User[] = data.data as User[]
        
        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetUsersById(req: Request, res: Response){
    try {
        const id = req.params.id
        const data = await users.getById(id);

        //Handle hide password
        let usersList : User[] = data.data as User[]
        
        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateUsers(req: Request, res: Response){
    try {
        const id = req.params.id
        const user:User = req.body
        const data = await users.update(id, user);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteUsersByUsername(req: Request, res: Response){
    try {
        const username = req.params.username
        const data = await users.deleteByUsername(username);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetUsersByUsername(req: Request, res: Response){
    try {
        const username = req.params.username
        const data = await users.getByUsername(username);

        //Handle hide password
        let usersList : User[] = data.data as User[]
        
        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateUsersByUsername(req: Request, res: Response){
    try {
        const username = req.params.username
        const user:User = req.body
        const data = await users.updateByUsername(username, user);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}