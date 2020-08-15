import {Router} from 'express'
import { handleGetUsers } from '../controller/user.controller';

const router = Router();

router.get("/fetch", handleGetUsers);

export default router