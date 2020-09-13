import { Router } from 'express'
import {
    handleRegisterPsychiatrists
} from '../../controller/psychiatrist.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';

const router = Router()

//User routes
router.post('/register', handleRegisterPsychiatrists)

export { router as psychiatrists }