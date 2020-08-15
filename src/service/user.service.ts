import { Users as UserInterface} from "../interface/user.interface";
import { User } from "../model/user";
import { connect } from './db'
import { Result } from "../model/result";

export class Users implements UserInterface{

    async get() : Promise<Result>{

        try {
            const conn = await connect()
            const users = await conn.query('SELECT * FROM users')
            return Promise.resolve({ success: true, data: users[0]})
        } catch (error) {
            console.error(error)
            return Promise.reject({ success: false, error });
        }
    }

    async add(user:User) : Promise<Result>{
        return Promise.reject({ success: false, data:"asdasda" });
    }

    async deleteAll() : Promise<Result>{
        return Promise.reject({ success: false, data:"asdasda" });
    }

    async delete(id:string) : Promise<Result>{
        return Promise.reject({ success: false, data:"asdasda" });
    }

    async update(id:string) : Promise<Result>{
        return Promise.reject({ success: false, data:"asdasda" });
    }

    async getById(id:string) : Promise<Result>{
        return Promise.reject({ success: false, data:"asdasda" });
    }
}