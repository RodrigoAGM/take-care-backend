import {Router} from 'express'
import { handleGetUsers, handleAddUsers } from '../controller/user.controller';

const router = Router();

router.get('/', handleGetUsers);
router.post('/add', handleAddUsers)

export default router