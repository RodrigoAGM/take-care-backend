import { createPool, Pool } from 'mysql2/promise';
import { config } from 'dotenv'

export class MySql {

    private static _instance: MySql
    conn: Pool

    constructor() {

        config()
        
        try {
            this.conn = createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
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