import { Tokens as TokenInterface } from "../interface/token.interface";
import { Token } from "../model/token";
import { MySql } from './db'
import { Result, ResultId } from "../model/result";
import { ResultSetHeader } from "mysql2";

export class Tokens implements TokenInterface {

    async get(): Promise<Result> {

        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM tokens')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(token: Token): Promise<ResultId> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('INSERT INTO tokens SET ?', [token])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: token, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(user_id: string, token: Token): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('UPDATE tokens set ? WHERE user_id = ?', [token, user_id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM tokens WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByUserId(user_id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            console.log(user_id)
            const res = await mysql.conn.query('SELECT * FROM tokens WHERE user_id = ?', user_id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}