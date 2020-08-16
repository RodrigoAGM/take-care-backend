import { Levels as LevelInterface } from "../interface/level.interface";
import { Level } from "../model/level";
import { connect } from './db'
import { Result, ResultId } from "../model/result";
import { ResultSetHeader } from "mysql2";

export class Levels implements LevelInterface {

    async get(): Promise<Result> {

        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM levels')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(level: Level): Promise<ResultId> {
        try {
            const conn = await connect()
            const res = await conn.query('INSERT INTO levels SET ?', [level])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: level, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM levels')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM levels WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, level: Level): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('UPDATE levels set ? WHERE id = ?', [level, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM levels WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}