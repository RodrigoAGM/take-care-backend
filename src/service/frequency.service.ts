import { Frequencies as FrequencyInterface } from "../interface/frequency.interface";
import { Frequency } from "../model/frequency";
import { connect } from './db'
import { Result, ResultId } from "../model/result";
import { ResultSetHeader } from "mysql2";

export class Frequencies implements FrequencyInterface {

    async get(): Promise<Result> {

        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM frequencies')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(frequency: Frequency): Promise<ResultId> {
        try {
            const conn = await connect()
            const res = await conn.query('INSERT INTO frequencies SET ?', [frequency])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: frequency, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM frequencies')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM frequencies WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, frequency: Frequency): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('UPDATE frequencies set ? WHERE id = ?', [frequency, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM frequencies WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}