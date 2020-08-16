import { Router } from 'express'
import {
    handleGetDiagnostics,
    handleAddDiagnostics,
    handleDeleteAllDiagnostics,
    handleDeleteDiagnostics,
    handleGetDiagnosticsById,
    handleUpdateDiagnostics,
} from '../controller/diagnostic.controller';

const router = Router()

router.get('/', handleGetDiagnostics)
router.post('/add', handleAddDiagnostics)
router.delete('/delete/all', handleDeleteAllDiagnostics)
router.delete('/delete/:id', handleDeleteDiagnostics)
router.get('/:id', handleGetDiagnosticsById)
router.put('/update/:id', handleUpdateDiagnostics)

export { router as diagnostics }