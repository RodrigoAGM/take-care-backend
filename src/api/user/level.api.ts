import { Router } from 'express'
import {
    handleGetLevelsByFrequency
} from '../../controller/level.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';

const router = Router()

//User routes
router.get('/frequency/:frequency', authenticateToken, handleGetLevelsByFrequency)

export { router as levels }