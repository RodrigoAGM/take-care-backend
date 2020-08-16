import { Frequencies } from "../service/frequency.service";
import { Request, Response } from 'express'
import { Frequency } from "../model/frequency";
import { Diagnostics } from "../service/diagnostic.service";

const frequencies = new Frequencies()
const diagnostics = new Diagnostics()

export async function handleGetFrequencies(req: Request, res: Response) {
    try {
        const data = await frequencies.get()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddFrequencies(req: Request, res: Response){
    try {
        const frequency:Frequency = req.body
        const data = await frequencies.add(frequency);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllFrequencies(req: Request, res: Response){
    try {
        const data = await frequencies.deleteAll();
        await diagnostics.deleteAll()
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteFrequencies(req: Request, res: Response){
    try {
        const id = req.params.id
        const data = await frequencies.delete(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetFrequenciesById(req: Request, res: Response){
    try {
        const id = req.params.id
        const data = await frequencies.getById(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateFrequencies(req: Request, res: Response){
    try {
        const id = req.params.id
        const frequency:Frequency = req.body
        const data = await frequencies.update(id, frequency);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}