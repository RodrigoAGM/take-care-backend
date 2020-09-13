import Base from "./base.interface";
import { Result, ResultId } from "../model/result";
import { Psychiatrist } from "../model/psychiatrist";

export interface Psychiatrists extends Base{
    getByUsername(username:string): Promise<Result>
    register(user: Psychiatrist): Promise<ResultId>
}