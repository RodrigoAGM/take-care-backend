import { Result } from "../model/result";

export interface Tokens {

    get(): Promise<Result>
    add(object: Object): Promise<Result>
    getById(id: string): Promise<Result>
    update(id: string, object: Object): Promise<Result>
    getByUserId(user_id: string): Promise<Result>
}