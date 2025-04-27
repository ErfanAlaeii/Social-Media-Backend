import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { authmiddleware } from "../middleware/authMiddleware.js";


const router = Router()

router.post('/register',register)
router.post('/login', login); 

export default router;