import { Frequencies as FrequencyInterface } from "../interface/frequency.interface";
import { Frequency } from "../model/frequency";
import { MySql } from './db'
import { Result, ResultId, ResultSetHeader} from "../model/result";

export class Frequencies implements FrequencyInterface {

    async get(): Promise<Result> {

        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM frequencies')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(frequency: Frequency): Promise<ResultId> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('INSERT INTO frequencies SET ?', [frequency])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: frequency, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM frequencies')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM frequencies WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, frequency: Frequency): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('UPDATE frequencies set ? WHERE id = ?', [frequency, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM frequencies WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}