import { Router } from 'express'
import {
    handleLogin,
    handleRefreshToken
} from '../controller/login.controller';

const router = Router()

router.post('/login', handleLogin)
router.post('/refresh', handleRefreshToken)

export { router as login }