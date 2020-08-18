import Base from "./base.interface";
import { Result } from "../model/result";

export interface Diagnostics extends Base{
    getByUserId(user_id:string): Promise<Result>
    getByLevelId(level_id:string): Promise<Result>
}