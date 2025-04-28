import { Router } from 'express'
import { updateUserController } from '../controllers/userController.js';
import { authmiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.put('/:id', authmiddleware, updateUserController)

export default router;