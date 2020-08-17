import { Router } from 'express'
import {
    handleGetUsers,
    handleAddUsers,
    handleDeleteAllUsers,
    handleDeleteUsers,
    handleGetUsersById,
    handleUpdateUsersByUsername,
    handleUpdateUsers,
    handleGetUsersByUsername,
    handleDeleteUsersByUsername,
} from '../controller/user.controller';
import { authenticateToken } from '../middleware/jwt.middleware';
import { authenticateRole } from '../middleware/role.middleware';
import { Roles } from '../model/user';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, authenticateRole(Roles.ADMIN), handleGetUsers)
router.post('/add', authenticateToken, authenticateRole(Roles.ADMIN), handleAddUsers)
router.delete('/delete/all', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAllUsers)
router.delete('/delete/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteUsers)
router.get('/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetUsersById)
router.put('/update/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdateUsers)
router.delete('/delete/username/:username', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteUsersByUsername)
router.get('/username/:username', authenticateToken, authenticateRole(Roles.ADMIN), handleGetUsersByUsername)
router.put('/update/username/:username', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdateUsersByUsername)

export { router as users }