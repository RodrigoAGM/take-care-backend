import Base from "./base.interface";
import { Result, ResultId } from "../model/result";
import { User } from "../model/user";

export interface Psychiatrists extends Base{
    getByUsername(username:string): Promise<Result>
    register(user: User): Promise<ResultId>
}