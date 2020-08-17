import { Router } from 'express'
import {
    handleLogin,
    handleRefreshToken,
    handleLogout
} from '../controller/login.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()

router.post('/login', handleLogin)
router.post('/refresh', handleRefreshToken)
router.post('/logout', authenticateToken, handleLogout)

export { router as login }