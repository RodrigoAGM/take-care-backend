import Base from "./base.interface";
import { Advice } from "../model/advice";
import { Result } from "../model/result";

export interface Advices extends Base{

    deleteByType(type:string): Promise<Result>
    getByType(type:string): Promise<Result>
    updateByType(type:string, advice: Advice): Promise<Result>
}