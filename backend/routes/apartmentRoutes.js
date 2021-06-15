import express from 'express'
const router = express.Router()
import {
  getApartments,
  getApartmentById,
  deleteApartment,
  createApartment,
  updateApartment,
} from '../controllers/apartmentController.js'
import { protect, realtor } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getApartments)
  .post(protect, realtor,  createApartment)

router
  .route('/:id')
  .get( getApartmentById)
  .delete(protect, realtor,  deleteApartment)
  .put(protect, realtor,  updateApartment)

export default router
