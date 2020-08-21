import Base from "./base.interface";
import { Result, ResultId } from "../model/result";
import { User } from "../model/user";

export interface Users extends Base{
    deleteByUsername(username:string): Promise<Result>
    getByUsername(username:string): Promise<Result>
    updateByUsername(username:string, user: User): Promise<Result>
    register(user: User): Promise<ResultId>
    getByEmail(mail:string): Promise<Result>
}