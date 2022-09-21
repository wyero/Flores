import express from 'express'
import {
    getMessage,
    getMessageById,
    createMessage,
    deleteMessage
} from '../controllers/MessageController'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/message', verifyUser, admin, getMessage)
router.get('/message/:id', verifyUser, admin, getMessageById)
router.post('/message', createMessage)
router.delete('/message/:id', verifyUser, admin, deleteMessage)

export default router