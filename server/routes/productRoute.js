import express from "express";
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

import {getProducts, getProductById, deleteProduct, updateProduct, createProduct} from '../controllers/prodcutController.js'

// FETCH ALL PRODUCTS GET /api/products
router.route('/').get(getProducts).post(protect, admin, createProduct)

// FETCH PRODUCT BY ID GET /api/products/:id
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router