import { Router } from 'express'
import {
    handleGetPsychiatrists,
    handleGetPsychiatristsByUsername,
    handleAddPsychiatrists,
    handleDeleteAllPsychiatrists,
    handleDeletePsychiatrists,
    handleUpdatePsychiatrists
} from '../../controller/psychiatrist.controller';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { authenticateRole } from '../../middleware/role.middleware';
import { Roles } from '../../model/user';
import { handleGetFrequenciesById } from '../../controller/frequency.controller';

const router = Router()

//Admin only routes
router.get('/', authenticateToken, authenticateRole(Roles.ADMIN), handleGetPsychiatrists)
router.get('/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleGetFrequenciesById)
router.get('/username/:username', authenticateToken, authenticateRole(Roles.ADMIN), handleGetPsychiatristsByUsername)
router.post('/add', authenticateToken, authenticateRole(Roles.ADMIN), handleAddPsychiatrists)
router.delete('/delete/all', authenticateToken, authenticateRole(Roles.ADMIN), handleDeleteAllPsychiatrists)
router.delete('/delete/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleDeletePsychiatrists)
router.put('/update/:id', authenticateToken, authenticateRole(Roles.ADMIN), handleUpdatePsychiatrists)

export { router as psychiatrists }