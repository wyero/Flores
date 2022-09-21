import express from 'express'
import {
    getImage,
    getImageById,
    saveImage,
    deleteImage
} from '../controllers/ImageController'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/images', getImage)
router.get('/images/:id', verifyUser, admin, getImageById)
router.post('/images', verifyUser, admin, saveImage)
router.delete('/images/:id', verifyUser, admin, deleteImage)

export default router