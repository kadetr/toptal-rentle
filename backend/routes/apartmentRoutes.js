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
  .get( getApartments)
  .post(  createApartment)

router
  .route('/:id')
  .get( getApartmentById)
  .delete(  deleteApartment)
  .put(  updateApartment)

export default router
