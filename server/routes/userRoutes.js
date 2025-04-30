import { Router } from 'express'
import { deletUserController, followUserController, getUserController, updateUserController } from '../controllers/userController.js';
import { authmiddleware, checkAdminRole,isOwnerOrAdminMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.put('/:id', authmiddleware, updateUserController)
router.delete('/:id', authmiddleware, checkAdminRole, deletUserController)
router.get('/:id', authmiddleware, isOwnerOrAdminMiddleware, getUserController);
router.put('/follow/:id',authmiddleware,followUserController)

export default router;