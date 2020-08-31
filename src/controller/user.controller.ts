import { Users } from "../service/user.service";
import { Request, Response } from 'express'
import { User, Roles } from "../model/user";
import { TokenRequest, Payload } from "../model/request";
import { Token } from "../model/token";

const users = new Users()

export async function handleGetUsers(req: Request, res: Response) {
    try {
        const data = await users.get()
        //Handle hide password
        let usersList: User[] = data.data as User[]

        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddUsers(req: Request, res: Response) {
    try {
        let { role , user} = req.body
        user = user as User

        if(role){
            if(role.toUpperCase() == "ADMIN") user.rol_id = Roles.ADMIN
            else if(role.toUpperCase() == "USER") user.rol_id = Roles.USER
            else{
                return res.status(400).send('Invalid role inserted')
            }
        }else{
            return res.status(400).send('No role specified, include the role as role: role_name.')
        }

        const data = await users.add(user);

        //Handle hide password
        let usersObj: User = data.data as User
        delete usersObj.password

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllUsers(req: Request, res: Response) {
    try {
        const data = await users.deleteAll();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteUsers(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await users.delete(id);

        //Handle hide password
        let usersList: User[] = data.data as User[]

        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetUsersById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await users.getById(id);

        //Handle hide password
        let usersList: User[] = data.data as User[]

        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateUsers(req: Request, res: Response) {
    try {
        const id = req.params.id
        const user: User = req.body
        const data = await users.update(id, user);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteUsersByUsername(req: Request, res: Response) {
    try {
        const username = req.params.username
        const data = await users.deleteByUsername(username);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetUsersByUsername(req: Request, res: Response) {
    try {
        const username = req.params.username
        const data = await users.getByUsername(username);

        //Handle hide password
        let usersList: User[] = data.data as User[]

        usersList.forEach((user, i) => {
            delete user.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateUsersByUsername(req: Request, res: Response) {
    try {
        const username = req.params.username
        const user: User = req.body
        const data = await users.updateByUsername(username, user);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleRegisterUsers(req: Request, res: Response) {
    try {
        const user: User = req.body
        const data = await users.register(user);

        //Handle hide password
        let usersObj: User = data.data as User
        delete usersObj.password
        delete usersObj.rol_id

        res.send(data)
    } catch (error) {
        if(error.error != null && Number(error.error.errno) == 1062){
            res.status(400)
        }else{
            res.status(500)
        }
        res.send(error)
    }
}

export async function handleGetUserWithToken(req: Request, res: Response) {
    try {
        const tokenRequest = req as TokenRequest
        const payload:Payload = tokenRequest.user

        let data = await users.getById(payload.id.toString());

        //Handle hide password
        let usersList: User[] = data.data as User[]

        usersList.forEach((user, i) => {
            delete user.password
            delete user.rol_id
        })
        data.data = usersList[0]

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateUserWithToken(req: Request, res: Response) {
    try {
        const tokenRequest = req as TokenRequest
        const payload:Payload = tokenRequest.user
        const user: User = req.body

        let data = await users.update(payload.id.toString(), user);

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}