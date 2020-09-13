import { Router } from 'express'
import {
    handleRegisterUsers,
    handleGetUserWithToken,
    handleUpdateUserWithToken,
    handleUpdatePasswordWithToken
} from '../../controller/user.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';

const router = Router()

//User routes
router.post('/register', handleRegisterUsers)
router.get('/get', authenticateToken, handleGetUserWithToken)
router.put('/update', authenticateToken, handleUpdateUserWithToken)
router.put('/update/password', authenticateToken, handleUpdatePasswordWithToken)

export { router as users }