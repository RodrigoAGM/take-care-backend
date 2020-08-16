import { Users as UserInterface } from "../interface/user.interface";
import { User } from "../model/user";
import { connect } from './db'
import { Result, ResultId } from "../model/result";
import { ResultSetHeader } from "mysql2";

export class Users implements UserInterface {

    async get(): Promise<Result> {

        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM users')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(user: User): Promise<ResultId> {
        try {
            const conn = await connect()
            const res = await conn.query('INSERT INTO users SET ?', [user])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: user, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM users')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM users WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, user: User): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('UPDATE users set ? WHERE id = ?', [user, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM users WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteByUsername(username: string): Promise<Result> {
        try {
            const conn = await connect()
            await conn.query('DELETE FROM users WHERE username = ?', username)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByUsername(username: string): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('SELECT * FROM users WHERE username = ?', username)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async updateByUsername(username: string, user: User): Promise<Result> {
        try {
            const conn = await connect()
            const res = await conn.query('UPDATE users set ? WHERE username = ?', [user, username])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}