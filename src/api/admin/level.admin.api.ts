import { Router } from 'express'
import {
    handleGetLevels,
    handleAddLevels,
    handleDeleteAllLevels,
    handleDeleteLevels,
    handleGetLevelsById,
    handleUpdateLevels,
} from '../../controller/level.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { authenticateRole } from '../../middleware/role.middleware';
import { Roles } from '../../model/user';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, authenticateRole(Roles.ADMIN), handleGetLevels)
router.get('/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetLevelsById)
router.post('/add', authenticateToken, authenticateRole(Roles.ADMIN), handleAddLevels)
router.delete('/delete/all', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAllLevels)
router.delete('/delete/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteLevels)
router.put('/update/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdateLevels)

export { router as levels }