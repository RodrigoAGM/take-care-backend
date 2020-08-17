import {config as envConfig} from 'dotenv'
import express, { Application } from 'express'
import { users } from './api/user.api'
import { levels } from './api/level.api'
import { json } from 'body-parser'
import { frequencies } from './api/frequency.api'
import { advices } from './api/advice.api'
import { diagnostics } from './api/diagnostic.api'
import { login } from './api/login.api'

export class App {

    private app: Application

    constructor(private port?: number | string) {
        this.app = express()
        envConfig()
        this.settings()
        this.routes()
    }

    settings() {
        console.log(process.env.PORT)
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    routes() {
        this.app.get('/', json(), function (req, res) {
            res.send('Hello World!');
        });
        this.app.use('/users', json(), users)
        this.app.use('/levels', json(), levels)
        this.app.use('/frequencies', json(), frequencies)
        this.app.use('/advices', json(), advices)
        this.app.use('/diagnostics', json(), diagnostics)
        this.app.use('/auth', json(), login)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('App listening port', this.app.get('port'))
    }
}