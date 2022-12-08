import express from "express";
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { getGenre, createGenre } from '../controllers/genreController.js'

router.route('/').post(protect, admin, createGenre).get(getGenre)

export default router
