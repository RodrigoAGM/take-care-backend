import { Psychiatrists } from "../service/psychiatrist.service";
import { Request, Response } from 'express'
import { Psychiatrist } from "../model/psychiatrist";
import { Roles } from "../model/user"

const psychiatrists = new Psychiatrists()

export async function handleGetPsychiatrists(req: Request, res: Response) {
    try {
        const data = await psychiatrists.get()
        //Handle hide password
        let usersList: Psychiatrist[] = data.data as Psychiatrist[]

        usersList.forEach((psychiatrist, i) => {
            delete psychiatrist.password
        })

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddPsychiatrists(req: Request, res: Response) {
    try {
        let { psychiatrist } = req.body
        psychiatrist = psychiatrist as Psychiatrist
        psychiatrist.rol_id = Roles.PSYCHIATRIST

        const data = await psychiatrists.add(psychiatrist);

        //Handle hide password
        let usersObj: Psychiatrist = data.data as Psychiatrist
        delete usersObj.password

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllPsychiatrists(req: Request, res: Response) {
    try {
        const data = await psychiatrists.deleteAll();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeletePsychiatrists(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await psychiatrists.delete(id);

        //Handle hide password
        let usersList: Psychiatrist[] = data.data as Psychiatrist[]

        usersList.forEach((psychiatrist, i) => {
            delete psychiatrist.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetPsychiatristsById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await psychiatrists.getById(id);

        //Handle hide password
        let usersList: Psychiatrist[] = data.data as Psychiatrist[]

        usersList.forEach((psychiatrist, i) => {
            delete psychiatrist.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdatePsychiatrists(req: Request, res: Response) {
    try {
        const id = req.params.id
        const psychiatrist: Psychiatrist = req.body
        const data = await psychiatrists.update(id, psychiatrist);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetPsychiatristsByUsername(req: Request, res: Response) {
    try {
        const username = req.params.username
        const data = await psychiatrists.getByUsername(username);

        //Handle hide password
        let usersList: Psychiatrist[] = data.data as Psychiatrist[]

        usersList.forEach((psychiatrist, i) => {
            delete psychiatrist.password
        })

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleRegisterPsychiatrists(req: Request, res: Response) {
    try {
        const psychiatrist: Psychiatrist = req.body
        const data = await psychiatrists.register(psychiatrist);

        //Handle hide password
        let usersObj: Psychiatrist = data.data as Psychiatrist
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

