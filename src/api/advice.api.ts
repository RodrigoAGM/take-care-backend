import { Router } from 'express'
import {
    handleGetAdvices,
    handleAddAdvices,
    handleDeleteAllAdvices,
    handleDeleteAdvices,
    handleGetAdvicesById,
    handleUpdateAdvices,
    handleDeleteAdvicesByType,
    handleGetAdvicesByType,
} from '../controller/advice.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()


//Admin only routes
router.get('/', authenticateToken, handleGetAdvices)
router.post('/add', authenticateToken, handleAddAdvices)
router.delete('/delete/all', authenticateToken, handleDeleteAllAdvices)
router.delete('/delete/:id', authenticateToken, handleDeleteAdvices)
router.get('/:id', authenticateToken, handleGetAdvicesById)
router.put('/update/:id', authenticateToken, handleUpdateAdvices)
router.delete('/delete/type/:type', authenticateToken, handleDeleteAdvicesByType)

//User routes
router.get('/type/:type', authenticateToken, handleGetAdvicesByType)

export { router as advices }