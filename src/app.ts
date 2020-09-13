import {config as envConfig} from 'dotenv'
import express, { Application } from 'express'
import { users } from './api/user/user.api'
import { psychiatrists } from './api/user/psychiatrist.api'
import { levels } from './api/user/level.api'
import { json } from 'body-parser'
import { advices } from './api/user/advice.api'
import { diagnostics } from './api/user/diagnostic.api'
import { login } from './api/login.api'
import { users as adminUsers } from './api/admin/user.admin.api'
import { psychiatrists as adminPsychiatrists } from './api/admin/psychiatrist.admin.api'
import { advices as adminAdvices } from './api/admin/advice.admin.api'
import { frequencies as adminFrequencies } from './api/admin/frequency.admin.api'
import { diagnostics as adminDiagnostics} from './api/admin/diagnostic.admin.api'
import { levels as adminLevels} from './api/admin/level.admin.api'

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

        //User and Admin routes
        this.app.use('/users', json(), users)
        this.app.use('/psychiatrists', json(), psychiatrists)
        this.app.use('/advices', json(), advices)
        this.app.use('/diagnostics', json(), diagnostics)
        this.app.use('/levels', json(), levels)

        //Admin only routes
        this.app.use('/admin/users', json(), adminUsers)
        this.app.use('/admin/psychiatrists', json(), adminPsychiatrists)
        this.app.use('/admin/advices', json(), adminAdvices)
        this.app.use('/admin/frequencies', json(), adminFrequencies)
        this.app.use('/admin/diagnostics', json(), adminDiagnostics)
        this.app.use('/admin/levels', json(), adminLevels)

        //General Routes
        this.app.use('/auth', json(), login)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('App listening port', this.app.get('port'))
    }
}