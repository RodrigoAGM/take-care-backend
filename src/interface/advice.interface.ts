import Base from "./base.interface";
import { Result } from "../model/result";

export interface Advices extends Base{

    deleteByType(type:string): Promise<Result>
    getByType(type:string): Promise<Result>
}