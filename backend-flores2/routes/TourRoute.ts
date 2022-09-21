import express from 'express'
import {
    getTour,
    getTourById,
    createTour,
    updateTour,
    deleteTour
} from '../controllers/TourController'
import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/tours', getTour)
router.get('/tours/:id', getTourById)
router.post('/tours', verifyUser, admin, createTour)
router.patch('/tours/:id', verifyUser, admin, updateTour)
router.delete('/tours/:id', verifyUser, admin, deleteTour)

export default router