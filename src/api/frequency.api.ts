import { Router } from 'express'
import {
    handleGetFrequencies,
    handleAddFrequencies,
    handleDeleteAllFrequencies,
    handleDeleteFrequencies,
    handleGetFrequenciesById,
    handleUpdateFrequencies
} from '../controller/frequency.controller';

const router = Router()

router.get('/', handleGetFrequencies)
router.post('/add', handleAddFrequencies)
router.delete('/delete/all', handleDeleteAllFrequencies)
router.delete('/delete/:id', handleDeleteFrequencies)
router.get('/:id', handleGetFrequenciesById)
router.put('/update/:id', handleUpdateFrequencies)

export { router as frequencies }