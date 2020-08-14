import * as mysql from "mysql";
import {dbConfig} from '../../config/db.config';

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});


export function ConnectDatabase(){
    connection.connect( (error) =>{
        if(error) throw error
        console.log('Database connected')
    })

    return connection
}