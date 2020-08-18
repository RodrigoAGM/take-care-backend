import { Router } from 'express'
import {
    handleGetDiagnosticsWithToken, handleAddDiagnosticsWithToken,
} from '../../controller/diagnostic.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';

const router = Router()

//User routes
router.get('/get', authenticateToken, handleGetDiagnosticsWithToken)
router.post('/add', authenticateToken, handleAddDiagnosticsWithToken)

export { router as diagnostics }