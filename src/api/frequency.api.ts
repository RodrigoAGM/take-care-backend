import { Router } from 'express'
import {
    handleGetFrequencies,
    handleAddFrequencies,
    handleDeleteAllFrequencies,
    handleGetFrequenciesById,
    handleUpdateFrequencies
} from '../controller/frequency.controller';

const router = Router()

router.get('/', handleGetFrequencies)
router.delete('/delete/all', handleDeleteAllFrequencies)
router.get('/:id', handleGetFrequenciesById)
router.put('/update/:id', handleUpdateFrequencies)

export { router as frequencies }