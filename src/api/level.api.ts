import { Router } from 'express'
import {
    handleGetLevels,
    handleAddLevels,
    handleDeleteAllLevels,
    handleDeleteLevels,
    handleGetLevelsById,
    handleUpdateLevels,
    handleGetLevelsByFrequency
} from '../controller/level.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, handleGetLevels)
router.post('/add', handleAddLevels)
router.delete('/delete/all', authenticateToken, handleDeleteAllLevels)
router.delete('/delete/:id', authenticateToken, handleDeleteLevels)
router.get('/:id', authenticateToken, handleGetLevelsById)
router.put('/update/:id', authenticateToken, handleUpdateLevels)

//User routes
router.get('/frequency/:frequency', authenticateToken, handleGetLevelsByFrequency)

export { router as levels }