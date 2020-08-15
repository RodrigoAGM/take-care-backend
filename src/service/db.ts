import {createPool} from 'mysql2';
import {dbConfig} from '../../config/db.config';

export async function connect(){

    try {
        const connection = await createPool({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        })
        return connection
        
    } catch (error) {
        console.log('Something went wrong trying to connect with database')
        throw error
    }
}