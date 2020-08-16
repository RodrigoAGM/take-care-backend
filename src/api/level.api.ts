import { Router } from 'express'
import {
    handleGetLevels,
    handleAddLevels,
    handleDeleteAllLevels,
    handleDeleteLevels,
    handleGetLevelsById,
    handleUpdateLevels
} from '../controller/level.controller';

const router = Router()

router.get('/', handleGetLevels)
router.post('/add', handleAddLevels)
router.delete('/delete/all', handleDeleteAllLevels)
router.delete('/delete/:id', handleDeleteLevels)
router.get('/:id', handleGetLevelsById)
router.put('/update/:id', handleUpdateLevels)

export { router as levels }