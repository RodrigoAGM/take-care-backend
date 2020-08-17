import { config } from 'dotenv'
import { Request, Response } from 'express'
import { Users } from '../service/user.service'
import { User } from '../model/user'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Tokens } from '../service/token.service'
import { Token } from '../model/token'
import { Payload, TokenRequest } from '../model/request'
import { ResultSetHeader } from '../model/result'

const users = new Users()
const tokens = new Tokens()
config()

function createAccessToken(user: Object){
    if(process.env.ACCESS_TOKEN_SECRET != undefined){
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    }
    throw 'error'
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const { username, password } = req.body
        const userRes = await users.getByUsername(username)
        const user = userRes.data as [User]
        let data

        if (user[0] != undefined && bcrypt.compareSync(password, user[0].password)) {

            delete user[0].password

            const tokenUser = {
                id: user[0].id,
                username: user[0].username,
                mail: user[0].mail
            }

            //Handle delete user password for response
            if (process.env.REFRESH_TOKEN_SECRET != undefined &&tokenUser.id != undefined) {
                const accessToken = createAccessToken(tokenUser)
                const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET)

                //Handle login with existing refresh token on database
                const tokenRes = await tokens.getByUserId(tokenUser.id.toString())
                const tokenObj = tokenRes.data as [Token]

                const refreshTokenObj:Token = {
                    token: refreshToken,
                    user_id: tokenUser.id
                }

                if(tokenObj[0] != undefined){
                    await tokens.update(tokenUser.id.toString(), refreshTokenObj)
                }else{
                    await tokens.add(refreshTokenObj)
                }

                data = {
                    success: true,
                    user: user[0],
                    token: accessToken,
                    refreshToken: refreshToken
                }
            } else {
                res.status(500)
                data = {
                    success: false,
                    error: 'Something went wrong authenticating user'
                }
            }
        } else {
            res.status(500)
            data = {
                success: false,
                error: 'Wrong username or password'
            }
        }

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}


export async function handleLogout(req: Request, res: Response) {
    try {
        const tokenReq = req as TokenRequest
        const data = await tokens.deleteByUserId(tokenReq.user.id.toString())

        const info = data.data as ResultSetHeader

        if (!info.changedRows && info.changedRows == 0) {
            
            res.status(400)
        }

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}


export async function handleRefreshToken(req: Request, res: Response) {

    try {
        let { token } = req.body
        token = token && token?.split(' ')[1]

        let data
        if(token != undefined && process.env.REFRESH_TOKEN_SECRET != undefined){

            await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            const decoded = await jwt.decode(token, {complete:true}) as {[key:string]:any}
            const payload = decoded.payload as Payload

            const tokenRes = await tokens.getByUserId(payload.id.toString())
            const userToken = tokenRes.data as [Token]

            if(userToken[0] != undefined && userToken[0].token == token){
                
                const accessToken = createAccessToken({
                    id: payload.id,
                    username: payload.username,
                    mail: payload.mail
                })
                
                data = {
                    success: true,
                    accessToken : accessToken
                }
            }else{
                res.send(403)
                data = {
                    success: false,
                    message: 'Invalid refresh token sent for user.'
                }
            }

        }else{
            res.send(401)
            data = {
                success: false,
                message: 'No token found request body.'
            }
        }

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Invalid refresh token sent for user.')
    }
}