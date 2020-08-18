import { Router } from 'express'
import {
    handleGetDiagnostics,
    handleAddDiagnostics,
    handleDeleteAllDiagnostics,
    handleDeleteDiagnostics,
    handleGetDiagnosticsById,
    handleUpdateDiagnostics,
    handleGetDiagnosticsByUserId,
    handleGetDiagnosticsByLevelId,
} from '../../controller/diagnostic.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { authenticateRole } from '../../middleware/role.middleware';
import { Roles } from '../../model/user';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, authenticateRole(Roles.ADMIN), handleGetDiagnostics)
router.get('/user/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetDiagnosticsByUserId)
router.get('/level/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetDiagnosticsByLevelId)
router.get('/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetDiagnosticsById)
router.post('/add', authenticateToken, authenticateRole(Roles.ADMIN), handleAddDiagnostics)
router.delete('/delete/all', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAllDiagnostics)
router.delete('/delete/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteDiagnostics)
router.put('/update/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdateDiagnostics)

export { router as diagnostics }