import { Router } from 'express'
import {
    handleGetDiagnostics,
    handleAddDiagnostics,
    handleDeleteAllDiagnostics,
    handleDeleteDiagnostics,
    handleGetDiagnosticsById,
    handleUpdateDiagnostics,
} from '../controller/diagnostic.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, handleGetDiagnostics)
router.post('/add', authenticateToken, handleAddDiagnostics)
router.delete('/delete/all', authenticateToken, handleDeleteAllDiagnostics)
router.delete('/delete/:id', authenticateToken, handleDeleteDiagnostics)
router.get('/:id', authenticateToken, handleGetDiagnosticsById)
router.put('/update/:id', authenticateToken, handleUpdateDiagnostics)

//User routes


export { router as diagnostics }