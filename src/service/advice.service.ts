import { Advices as AdviceInterface } from "../interface/advice.interface";
import { Advice } from "../model/advice";
import { connect } from './db'
import { Result, ResultId } from "../model/result";
import { ResultSetHeader } from "mysql2";

export class Advices implements AdviceInterface {

    async get(): Promise<Result> {

        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM advices')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(advice: Advice): Promise<ResultId> {
        try {
            const conn = await connect()
            const res = await conn.query('INSERT INTO advices SET ?', [advice])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: advice, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM advices')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM advices WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, advice: Advice): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('UPDATE advices set ? WHERE id = ?', [advice, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM advices WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteByType(type: string): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM advices WHERE type = ?', type)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByType(type: string): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM advices WHERE type = ?', type)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}