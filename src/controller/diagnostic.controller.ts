import { Diagnostics } from "../service/diagnostic.service";
import e, { Request, Response } from 'express'
import { Diagnostic } from "../model/diagnostic";
import { Frequency } from "../model/frequency";
import { Frequencies } from "../service/frequency.service";
import { Levels } from "../service/level.service";
import { Level } from "../model/level";
import { ResultSetHeader } from "../model/result";

const diagnostics = new Diagnostics()
const frequencies = new Frequencies()
const levels = new Levels()

export async function handleGetDiagnostics(req: Request, res: Response) {
    try {
        let data = await diagnostics.get()
        //Handle get objects 
        let diagnosticsList: Diagnostic[] = data.data as Diagnostic[]

        for (let index = 0; index < diagnosticsList.length; index++) {
            let level = await levels.getById(diagnosticsList[index].level_id.toString())
            let frequency = await frequencies.getById(diagnosticsList[index].frequency_id.toString())

            let levelObj = level.data as [Level]
            let frequencyObj = frequency.data as [Frequency]

            if (levelObj[0] && frequencyObj[0]) {
                delete diagnosticsList[index].frequency_id
                delete diagnosticsList[index].level_id
                diagnosticsList[index].level = levelObj[0]
                diagnosticsList[index].frequency = frequencyObj[0]
            }
            else {
                res.status(206)
            }
        }

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

        if (levelObj[0]) {
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
            data = {
                success: false,
                data: 'No level is defined for this heart rate, define a level for this heart rate before creating diagnostic'
            }
            res.status(400)
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
        if (diagnostic[0]) {
            await frequencies.delete(diagnostic[0].frequency_id.toString())
            data = await diagnostics.delete(id);
        } else {
            data = 'No Diagnostic found with this id.'
            res.status(206)
        }

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function handleGetDiagnosticsById(req: Request, res: Response) {
    try {
        const id = req.params.id
        let data = await diagnostics.getById(id);
        console.log(data)
        //Handle get objects 
        let diagnosticsObj = data.data as [Diagnostic]
        console.log(diagnosticsObj)

        if (!diagnosticsObj) {

            res.status(204)
            data = {
                success: false,
                data: 'No diagnostic found with the specified id'
            }

        } else {
            let level = await levels.getById(diagnosticsObj[0].level_id.toString())
            let frequency = await frequencies.getById(diagnosticsObj[0].frequency_id.toString())

            let levelObj = level.data as [Level]
            let frequencyObj = frequency.data as [Frequency]

            if (levelObj[0] && frequencyObj[0]) {
                delete diagnosticsObj[0].frequency_id
                delete diagnosticsObj[0].level_id
                diagnosticsObj[0].level = levelObj[0]
                diagnosticsObj[0].frequency = frequencyObj[0]
            }
            else {
                res.status(206)
            }
        }

        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateDiagnostics(req: Request, res: Response) {
    try {
        const id = req.params.id
        const diagnostic: Diagnostic = req.body
        let data

        if (diagnostic.frequency_id || diagnostic.level_id || diagnostic.user_id) {
            data = {
                success: false,
                data: 'Cannot update foreign keys for diagnostic, only description or date.'
            }
            res.status(400)
        } else {
            data = await diagnostics.update(id, diagnostic);
            const info = data.data as ResultSetHeader

            if (info.changedRows && info.changedRows == 0) {
                data = {
                    success: false,
                    data: 'Something went wrong, diagnostic not updated'
                }
                res.status(400)
            }
        }

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}