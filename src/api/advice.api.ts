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
    handleUpdateAdvicesByType
} from '../controller/advice.controller';

const router = Router()

router.get('/', handleGetAdvices)
router.post('/add', handleAddAdvices)
router.delete('/delete/all', handleDeleteAllAdvices)
router.delete('/delete/:id', handleDeleteAdvices)
router.get('/:id', handleGetAdvicesById)
router.put('/update/:id', handleUpdateAdvices)
router.delete('/delete/type/:type', handleDeleteAdvicesByType)
router.get('/username/:type', handleGetAdvicesByType)
router.put('/update/type/:type', handleUpdateAdvicesByType)

export { router as advices }