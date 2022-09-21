import express from 'express'
import {dataCount} from '../controllers/CountMessageController'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/count-message', verifyUser, admin, dataCount)

export default router
