import { Users as UserInterface } from "../interface/user.interface";
import { User, Roles } from "../model/user";
import { MySql } from './db'
import { Result, ResultId, ResultSetHeader } from "../model/result";
import * as bcrypt from 'bcrypt'

export class Users implements UserInterface {

    async get(): Promise<Result> {

        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM users')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(user: User): Promise<ResultId> {
        try {
            const mysql = MySql.getConnection()
            user.password = bcrypt.hashSync(user.password, 10)
            user.rol_id = Roles.USER
            const res = await mysql.conn.query('INSERT INTO users SET ?', [user])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: user, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM users')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM users WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, user: User): Promise<Result> {
        try {
            const mysql = MySql.getConnection()

            if(user.password != undefined){
                user.password = bcrypt.hashSync(user.password, 10)
            }
            
            const res = await mysql.conn.query('UPDATE users set ? WHERE id = ?', [user, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM users WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteByUsername(username: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            await mysql.conn.query('DELETE FROM users WHERE username = ?', username)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByUsername(username: string): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('SELECT * FROM users WHERE username = ?', username)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async updateByUsername(username: string, user: User): Promise<Result> {
        try {
            const mysql = MySql.getConnection()
            const res = await mysql.conn.query('UPDATE users set ? WHERE username = ?', [user, username])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }


    async register(user: User): Promise<ResultId> {
        try {
            const mysql = MySql.getConnection()
            user.password = bcrypt.hashSync(user.password, 10)
            user.rol_id = Roles.USER
            const res = await mysql.conn.query('INSERT INTO users SET ?', [user])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: user, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}