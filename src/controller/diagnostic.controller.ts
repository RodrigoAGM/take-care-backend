import { Diagnostics } from "../service/diagnostic.service";
import e, { Request, Response } from 'express'
import { Diagnostic } from "../model/diagnostic";
import { Frequency } from "../model/frequency";
import { Frequencies } from "../service/frequency.service";
import { Levels } from "../service/level.service";
import { Level } from "../model/level";

const diagnostics = new Diagnostics()
const frequencies = new Frequencies()
const levels = new Levels()

export async function handleGetDiagnostics(req: Request, res: Response) {
    try {
        const data = await diagnostics.get()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddDiagnostics(req: Request, res: Response) {
    try {
        const { user_id, frequency, date, description } = req.body

        const frequencyObj: Frequency = frequency
        const levelRes = await levels.getByFrequencyValue(frequencyObj.heart_rate)
        const levelObj = levelRes.data as [Level]

        let diagnostic: Diagnostic
        let data

        if (levelObj[0] != undefined) {
            const frequencyRes = await frequencies.add(frequency)

            diagnostic = {
                date: date,
                description: description,
                user_id: user_id,
                frequency_id: Number.parseInt(frequencyRes.id),
                level_id: levelObj[0].id || -1
            }
            data = await diagnostics.add(diagnostic);

        } else {
            data = 'No level is defined for this heart rate'
            res.status(202)
        }

        res.send(data)

    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteAllDiagnostics(req: Request, res: Response) {
    try {
        const data = await diagnostics.deleteAll();
        await frequencies.deleteAll();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleDeleteDiagnostics(req: Request, res: Response) {
    try {
        const id = req.params.id
        const diagnosticRes = await diagnostics.getById(id)

        const diagnostic = diagnosticRes.data as [Diagnostic]
        let data
        if (diagnostic[0] != undefined) {
            await frequencies.delete(diagnostic[0].frequency_id.toString())
            data = await diagnostics.delete(id);
        } else {
            data = 'No Diagnostic found with this id.'
            res.status(202)
        }

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetDiagnosticsById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = await diagnostics.getById(id);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleUpdateDiagnostics(req: Request, res: Response) {
    try {
        const id = req.params.id
        const diagnostic: Diagnostic = req.body
        const data = await diagnostics.update(id, diagnostic);
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}