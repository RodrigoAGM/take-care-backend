import { Router } from 'express'
import {
    handleLogin,
    handleRefreshToken,
    handleLogout,
    handleRequestRecoverPassword,
    handleRecoverPassword,
    handlePsychiatristLogin
} from '../controller/login.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()

//User routes
router.post('/login', handleLogin)
router.post('/psychiatrist/login', handlePsychiatristLogin)
router.post('/refresh', handleRefreshToken)
router.post('/logout', authenticateToken, handleLogout)
router.post('/request/recover', handleRequestRecoverPassword)
router.post('/recoverpass', handleRecoverPassword)

export { router as login }