import { Advices } from "../service/advice.service";
import { Request, Response } from 'express'
import { Advice } from "../model/advice";

const advices = new Advices()

export async function handleGetAdvices(req: Request, res: Response) {
    try {
        const data = await advices.get()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddAdvices(req: Request, res: Response){
    try {
        const advice:Advice = req.body
        const data = await advices.add(advice);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllAdvices(req: Request, res: Response){
    try {
        const data = await advices.deleteAll();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAdvices(req: Request, res: Response){
    try {
        const id = req.params.id
        const data = await advices.delete(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetAdvicesById(req: Request, res: Response){
    try {
        const id = req.params.id
        const data = await advices.getById(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateAdvices(req: Request, res: Response){
    try {
        const id = req.params.id
        const advice:Advice = req.body
        const data = await advices.update(id, advice);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAdvicesByType(req: Request, res: Response){
    try {
        const type = req.params.type
        const data = await advices.deleteByType(type)
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetAdvicesByType(req: Request, res: Response){
    try {
        const type = req.params.type
        const data = await advices.getByType(type)
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateAdvicesByType(req: Request, res: Response){
    try {
        const type = req.params.type
        const advice:Advice = req.body
        const data = await advices.updateByType(type, advice)
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}