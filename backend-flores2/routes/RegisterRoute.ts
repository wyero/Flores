import express from 'express'
import {register} from '../controllers/RegisterAdmin'

const router = express.Router()

router.post('/register-admin', register)

export default router