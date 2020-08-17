import { config } from 'dotenv'
import { Request, Response } from 'express'
import { Users } from '../service/user.service'
import { User } from '../model/user'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Tokens } from '../service/token.service'
import { Token } from '../model/token'

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

                const refreshTokenObj:Token = {
                    token: refreshToken,
                    user_id: tokenUser.id
                }
                await tokens.add(refreshTokenObj)

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
        //const data = await levels.get()
        //res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}



export async function refreshToken(req: Request, res: Response) {
    
}