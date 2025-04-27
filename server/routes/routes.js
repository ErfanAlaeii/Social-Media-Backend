import {Router} from 'express'
import userRoutes from './userRoutes.js'

const router = Router()

const baseURL = "api/v1";

router.use(`/${baseURL}/users`,userRoutes)

export default router;