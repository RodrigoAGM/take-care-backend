import { Response } from "express";

export default interface Base{
    
    get(): Promise<Response>
    add(): Promise<Response>
    deleteAll(): Promise<Response>
    delete(id:string): Promise<Response>
    getById(id:string): Promise<Response>
    update(id:string): Promise<Response>
}