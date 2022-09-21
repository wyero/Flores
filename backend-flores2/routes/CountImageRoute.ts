import express from 'express'
import {dataCount} from '../controllers/CountImageController'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/count-image', verifyUser, admin, dataCount)

export default router
