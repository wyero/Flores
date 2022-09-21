import express from 'express'
import {dataCount} from '../controllers/CountTourController'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/count-tour', verifyUser, admin, dataCount)

export default router
