import { Router } from 'express'
import {
    handleGetAdvicesByType,
} from '../../controller/advice.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';

const router = Router()

//User routes
router.get('/type/:type', authenticateToken, handleGetAdvicesByType)

export { router as advices }