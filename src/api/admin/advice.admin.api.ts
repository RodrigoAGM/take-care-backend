import { Router } from 'express'
import {
    handleGetAdvices,
    handleAddAdvices,
    handleDeleteAllAdvices,
    handleDeleteAdvices,
    handleGetAdvicesById,
    handleUpdateAdvices,
    handleDeleteAdvicesByType,
} from '../../controller/advice.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { authenticateRole } from '../../middleware/role.middleware';
import { Roles } from '../../model/user';


const router = Router()

//Admin only routes
router.get('/', authenticateToken, authenticateRole(Roles.ADMIN), handleGetAdvices)
router.get('/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetAdvicesById)
router.post('/add', authenticateToken, authenticateRole(Roles.ADMIN), handleAddAdvices)
router.delete('/delete/all', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAllAdvices)
router.delete('/delete/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAdvices)
router.delete('/delete/type/:type', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAdvicesByType)
router.put('/update/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdateAdvices)

export { router as advices }