import { Diagnostics as DiagnosticInterface } from "../interface/diagnostic.interface";
import { Diagnostic } from "../model/diagnostic";
import { MySql } from './db'
import { Result, ResultId, ResultSetHeader} from "../model/result";

export class Diagnostics implements DiagnosticInterface {

    async get(): Promise<Result> {

        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM diagnostics')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(diagnostic: Diagnostic): Promise<ResultId> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('INSERT INTO diagnostics SET ?', [diagnostic])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: diagnostic, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM diagnostics')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM diagnostics WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, diagnostic: Diagnostic): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('UPDATE diagnostics set ? WHERE id = ?', [diagnostic, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM diagnostics WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByUserId(user_id:string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM diagnostics WHERE user_id = ?', user_id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByLevelId(level_id:string): Promise<Result>{
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM diagnostics WHERE level_id = ?', level_id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}