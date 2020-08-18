import { Levels } from "../service/level.service";
import { Request, Response } from 'express'
import { Level } from "../model/level";
import { Frequencies } from "../interface/frequency.interface";
import { Frequency } from "../model/frequency";

const levels = new Levels()

export async function handleGetLevels(req: Request, res: Response) {
    try {
        const data = await levels.get()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddLevels(req: Request, res: Response) {
    try {
        const level: Level = req.body
        const data = await levels.add(level);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllLevels(req: Request, res: Response) {
    try {
        const data = await levels.deleteAll();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteLevels(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await levels.delete(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetLevelsById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await levels.getById(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateLevels(req: Request, res: Response) {
    try {
        const id = req.params.id
        const level: Level = req.body
        const data = await levels.update(id, level);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetLevelsByFrequency(req: Request, res: Response) {
    try {
        const frequency = Number.parseInt(req.params.frequency)
        let data = await levels.getByFrequencyValue(frequency)

        const frequencyRes = data.data as [Frequency]

        if (!frequencyRes[0]) {
            data = {
                success: false,
                data: 'No level found for this frequency'
            }
        }

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}