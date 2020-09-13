import { Psychiatrists as PsychiatristInterface } from "../interface/psychiatrist.interface";
import { Roles } from "../model/user";
import { Psychiatrist } from "../model/psychiatrist"
import { MySql } from './db'
import { Result, ResultId, ResultSetHeader } from "../model/result";
import * as bcrypt from 'bcrypt'

export class Psychiatrists implements PsychiatristInterface {

    mysql = MySql.getConnection()

    async get(): Promise<Result> {

        try {
            const res = await this.mysql.conn.query('SELECT * FROM psychiatrists')
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(psychiatrist: Psychiatrist): Promise<ResultId> {
        try {
            console.log(psychiatrist)
            psychiatrist.password = bcrypt.hashSync(psychiatrist.password, 10)
            const res = await this.mysql.conn.query('INSERT INTO psychiatrists SET ?', [psychiatrist])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: psychiatrist, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async deleteAll(): Promise<Result> {
        try {
            await this.mysql.conn.query('DELETE FROM psychiatrists')
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async delete(id: string): Promise<Result> {
        try {
            await this.mysql.conn.query('DELETE FROM psychiatrists WHERE id = ?', id)
            return Promise.resolve({ success: true, data: undefined })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async update(id: string, psychiatrist: Psychiatrist): Promise<Result> {
        try {

            if(psychiatrist.password != undefined){
                psychiatrist.password = bcrypt.hashSync(psychiatrist.password, 10)
            }

            if(psychiatrist.rol_id){
                return Promise.reject({ success: false, error:'Role cannot be updated' });
            }
            
            const res = await this.mysql.conn.query('UPDATE psychiatrists set ? WHERE id = ?', [psychiatrist, id])
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getById(id: string): Promise<Result> {
        try {
            const res = await this.mysql.conn.query('SELECT * FROM psychiatrists WHERE id = ?', id)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async getByUsername(username: string): Promise<Result> {
        try {
            const res = await this.mysql.conn.query('SELECT * FROM psychiatrists WHERE username = ?', username)
            return Promise.resolve({ success: true, data: res[0] })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async register(psychiatrist: Psychiatrist): Promise<ResultId> {
        try {
            const mysql = MySql.getConnection()
            psychiatrist.password = bcrypt.hashSync(psychiatrist.password, 10)
            psychiatrist.rol_id = Roles.PSYCHIATRIST
            const res = await mysql.conn.query('INSERT INTO psychiatrists SET ?', [psychiatrist])
            const parsedRes: ResultSetHeader = res[0] as ResultSetHeader
            return Promise.resolve({ success: true, data: psychiatrist, id: parsedRes.insertId.toString() })
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }
}