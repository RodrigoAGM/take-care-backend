import { createPool, Pool } from 'mysql2/promise';
import { dbConfig } from '../../config/db.config';

export class MySql {

    private static _instance: MySql
    conn: Pool

    constructor() {
        try {
            this.conn = createPool({
                host: dbConfig.HOST,
                user: dbConfig.USER,
                password: dbConfig.PASSWORD,
                database: dbConfig.DB
            })
            console.log('Database connected')
        } catch (error) {
            console.log('Something went wrong trying to connect with database')
            throw error
        }
    }

    public static getConnection() {
        return this._instance || (this._instance = new this())
    }
}