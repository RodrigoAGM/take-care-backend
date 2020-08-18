import { Router } from 'express'
import {
    handleGetFrequencies,
    handleAddFrequencies,
    handleDeleteAllFrequencies,
    handleGetFrequenciesById,
    handleUpdateFrequencies
} from '../../controller/frequency.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { authenticateRole } from '../../middleware/role.middleware';
import { Roles } from '../../model/user';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, authenticateRole(Roles.ADMIN), handleGetFrequencies)
router.delete('/delete/all', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAllFrequencies)
router.get('/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetFrequenciesById)
router.put('/update/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdateFrequencies)

export { router as frequencies }