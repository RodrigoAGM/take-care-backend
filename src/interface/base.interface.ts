import { Result } from "../model/result";

export default interface Base{
    
    get(): Promise<Result>
    add(object: Object): Promise<Result>
    deleteAll(): Promise<Result>
    delete(id:string): Promise<Result>
    getById(id:string): Promise<Result>
    update(id:string, object: Object): Promise<Result>
}