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
    handleRegisterUsers
} from '../controller/user.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, handleGetUsers)
router.post('/add', authenticateToken, handleAddUsers)
router.delete('/delete/all', authenticateToken, handleDeleteAllUsers)
router.delete('/delete/:id', authenticateToken, handleDeleteUsers)
router.get('/:id', authenticateToken, handleGetUsersById)
router.put('/update/:id', authenticateToken, handleUpdateUsers)
router.delete('/delete/username/:username', authenticateToken, handleDeleteUsersByUsername)
router.get('/username/:username', authenticateToken, handleGetUsersByUsername)
router.put('/update/username/:username', authenticateToken, handleUpdateUsersByUsername)

//User routes
router.post('/register', handleRegisterUsers)


export { router as users }