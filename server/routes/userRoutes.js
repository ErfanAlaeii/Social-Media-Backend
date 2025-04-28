import { Router } from 'express'
import { deletUserController, updateUserController } from '../controllers/userController.js';
import { authmiddleware, checkAdminRole } from '../middleware/authMiddleware.js'

const router = Router()

router.put('/:id', authmiddleware, updateUserController)
router.delete('/:id',authmiddleware,checkAdminRole,deletUserController)

export default router;