import { Router } from 'express'
import {
    handleRegisterUsers
} from '../controller/user.controller';
import { authenticateToken } from '../middleware/jwt.middleware';
import { authenticateRole } from '../middleware/role.middleware';
import { Roles } from '../model/user';

const router = Router()

//User routes
router.post('/register', handleRegisterUsers)

export { router as users }