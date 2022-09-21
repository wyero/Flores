import express from 'express'
import {dataCount} from '../controllers/CountUser'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/count-user', verifyUser, admin, dataCount)

export default router
