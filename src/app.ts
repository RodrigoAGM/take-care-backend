import express, {Application} from 'express'
import * as users from './api/user.api'
import {json} from 'body-parser' 

export class App{

    private app: Application

    constructor(private port?: number | string){
        this.app = express()
        this.settings()
        this.routes()
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    routes(){
        this.app.get('/', json(), function (req, res) {
            res.send('Hello World!');
        });
        this.app.use('/users', json(), users.default)
    }

    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log('App listening port', this.app.get('port'))
    }
}