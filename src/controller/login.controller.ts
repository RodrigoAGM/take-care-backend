import { config } from 'dotenv'
import e, { Request, Response } from 'express'
import { Users } from '../service/user.service'
import { User } from '../model/user'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as mailer from 'nodemailer'
import { Tokens } from '../service/token.service'
import { Token } from '../model/token'
import { Payload, TokenRequest } from '../model/request'
import { ResultSetHeader } from '../model/result'
import * as crypto from 'crypto'

const users = new Users()
const tokens = new Tokens()
config()

function createAccessToken(user: Object) {
    if (process.env.ACCESS_TOKEN_SECRET != undefined) {
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

            const tokenUser = {
                id: user[0].id,
                username: user[0].username,
                mail: user[0].mail,
                role: user[0].rol_id
            }

            delete user[0].password
            delete user[0].rol_id

            //Handle delete user password for response
            if (process.env.REFRESH_TOKEN_SECRET != undefined && tokenUser.id != undefined) {
                const accessToken = createAccessToken(tokenUser)
                const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN_SECRET)

                //Handle login with existing refresh token on database
                const tokenRes = await tokens.getByUserId(tokenUser.id.toString())
                const tokenObj = tokenRes.data as [Token]

                const refreshTokenObj: Token = {
                    token: refreshToken,
                    user_id: tokenUser.id
                }

                if (tokenObj[0] != undefined) {
                    await tokens.update(tokenUser.id.toString(), refreshTokenObj)
                } else {
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
            res.status(400)
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
        const deleteRes = await tokens.deleteByUserId(tokenReq.user.id.toString())
        let data

        const info = deleteRes.data as ResultSetHeader

        if (info.affectedRows == 0) {
            data = {
                success: false,
                error: 'User already logged out'
            }
            res.status(400)
        } else {
            data = deleteRes
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
        if (token != undefined && process.env.REFRESH_TOKEN_SECRET != undefined) {

            await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            const decoded = await jwt.decode(token, { complete: true }) as { [key: string]: any }
            const payload = decoded.payload as Payload

            const tokenRes = await tokens.getByUserId(payload.id.toString())
            const userToken = tokenRes.data as [Token]

            if (userToken[0] != undefined && userToken[0].token == token) {

                const accessToken = createAccessToken({
                    id: payload.id,
                    username: payload.username,
                    mail: payload.mail,
                    role: payload.role
                })

                data = {
                    success: true,
                    accessToken: accessToken
                }
            } else {
                res.send(403)
                data = {
                    success: false,
                    message: 'Invalid refresh token sent for user.'
                }
            }

        } else {
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


export async function handleRequestRecoverPassword(req: Request, res: Response) {

    try {
        const { mail } = req.body
        const userRes = await users.getByEmail(mail)
        let data

        if (userRes.success) {
            let userlist = userRes.data as [User]

            if (userlist[0]) {

                let user = userlist[0]

                let transporter = mailer.createTransport({
                    host: process.env.MAILGUN_SMTP_SERVER,
                    port: Number(process.env.MAILGUN_SMTP_PORT),
                    secure: false,
                    auth: {
                        user: process.env.MAILGUN_SMTP_LOGIN,
                        pass: process.env.MAILGUN_SMTP_PASSWORD
                    }
                });

                var validationKey = crypto.randomBytes(10).toString('hex')

                let info = await transporter.sendMail({
                    from: 'soporte.takecare@gmail.com', // sender address
                    to: user.mail, // list of receivers
                    subject: "Take Care - Recover Password", // Subject line
                    html: "<p>Hola <b>" + user.username + "</b>!</p><p>Si recibiste este correo es porque " +
                        "solicitaste una clave de recuperación de contraseña.</p><p>Para poder cambiar tu contraseña deberás " +
                        "ingresar el siguiente código en la app junto con tu nueva contraseña para que el cambio sea válido:</p>" +
                        "<p><b>" + validationKey + "</b></p><p>Si no realizaste esta solicitud verifica las credenciales de tu cuenta o solicita " +
                        "un cambio de contraseña por seguridad.</p><p>Atte. Equipo de soporte de Take Care.</p>", // html body
                });

                user.password = validationKey;

                let userCopy = { 
                    id: user.id,
                    rol: user.rol_id
                }

                delete user.id
                delete user.rol_id

                if (userCopy.id) { 
                    await users.update(userCopy.id.toString(), user) 
                    
                    data = {
                        success: true,
                        message: 'Recover token sent to user mail.'
                    }
                
                }
                else {
                    res.status(400)
                    data = {
                        success: false,
                        error: 'Something went wrong.'
                    }
                }

            } else {
                res.status(400)
                data = {
                    success: false,
                    error: 'No user was found with the inserted email. Create a new account to start using the app.'
                }
            }
        } else {
            res.status(400)
            data = {
                success: false,
                error: 'No user was found with the inserted email. Create a new account to start using the app.'
            }
        }
        res.send(data)

    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong.')
    }
}

export async function handleRecoverPassword(req: Request, res: Response) {

    try {
        const { mail, password, token } = req.body
        const userRes = await users.getByEmail(mail)
        let data

        if (userRes.success) {
            const userlist = userRes.data as [User]

            if (userlist[0]) {

                let user = userlist[0]

                if(bcrypt.compareSync(token, user.password) && user.id){	

                    const userCopy = { 
                        id: user.id
                    }
    
                    delete user.id
                    delete user.rol_id
                    user.password = password

                    await users.update(userCopy.id.toString(), user) 
                    
                    data = {
                        success: true,
                        message: 'Password successfully changed.'
                    }
            
                }else{
                    res.status(400)
                    data = {
                        success: false,
                        error: 'The inserted recover token is invalid.'
                    }
                }
            } else {
                res.status(500)
                data = {
                    success: false,
                    error: 'Something went wrong.'
                }
            }
        } else {
            res.status(500)
            data = {
                success: false,
                error: 'Something went wrong.'
            }
        }

        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong.')
    }
}