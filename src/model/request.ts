import { Request } from 'express'

export interface TokenRequest extends Request {
    user: Payload
}

//Interface used to parse payload from token
export interface Payload{
    id: number,
    username: string,
    mail: string,
    role: number,
    iat: number,
    exp: number
}