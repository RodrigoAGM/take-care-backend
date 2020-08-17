import * as jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { Response, NextFunction } from 'express'
import { Payload } from '../model/request'

config()

export async function authenticateToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader?.split(' ')[1]

    if(token == null) return res.status(401).send('No token found in authorization header, no authorized')

    if (process.env.ACCESS_TOKEN_SECRET != undefined){
        try {
            await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const decoded = await jwt.decode(token, {complete:true}) as {[key:string]:any}
            req.user = decoded.payload as Payload
            next()
            
        } catch (error) {
            console.log(error)
            return res.status(403).send('Invalid token in authorization header')
        }
        
    }
}