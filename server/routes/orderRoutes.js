import express from "express";
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { addOrderItems, getOrders, getMyOrders, getOrderById } from '../controllers/orderController.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)

export default router
