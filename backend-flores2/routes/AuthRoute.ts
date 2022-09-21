import express from 'express'
import { Login, Me, Logout } from '../controllers/AuthController'

const router = express.Router()

router.get('/me', Me)
router.post('/login', Login)
router.delete('/logout', Logout)

export default router