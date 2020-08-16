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
    handleDeleteUsersByUsername
} from '../controller/user.controller';

const router = Router()

router.get('/', handleGetUsers)
router.post('/add', handleAddUsers)
router.delete('/delete/all', handleDeleteAllUsers)
router.delete('/delete/:id', handleDeleteUsers)
router.get('/:id', handleGetUsersById)
router.put('/update/:id', handleUpdateUsers)
router.delete('/delete/username/:username', handleDeleteUsersByUsername)
router.get('/username/:username', handleGetUsersByUsername)
router.put('/update/username/:username', handleUpdateUsersByUsername)

export { router as users }