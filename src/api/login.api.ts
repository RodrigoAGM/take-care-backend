import { Router } from 'express'
import {
    handleLogin
} from '../controller/login.controller';

const router = Router()

router.post('/login', handleLogin)

export { router as login }