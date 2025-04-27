import {Router} from 'express'
import userRoutes from './userRoutes.js'
import authRoutes from './authRoutes.js'

const router = Router()

const baseURL = "api/v1";

router.use(`/${baseURL}/users`,userRoutes)
router.use(`/${baseURL}/auth`,authRoutes)

export default router;