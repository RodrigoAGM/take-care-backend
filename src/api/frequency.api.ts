import { Router } from 'express'
import {
    handleGetFrequencies,
    handleAddFrequencies,
    handleDeleteAllFrequencies,
    handleGetFrequenciesById,
    handleUpdateFrequencies
} from '../controller/frequency.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, handleGetFrequencies)
router.delete('/delete/all', authenticateToken, handleDeleteAllFrequencies)
router.get('/:id', authenticateToken, handleGetFrequenciesById)
router.put('/update/:id', authenticateToken, handleUpdateFrequencies)

//User routes


export { router as frequencies }