import Order from '../models/Order.js'
import asyncHandler from 'express-async-handler'

// create new order /api/orders
const addOrderItems = asyncHandler(async(req, res) => {
  const {
    fullname, 
    address,
    phoneNumber, 
    cart 
  } = req.body

  if(cart && cart.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      userId: req.user._id, 
      fullname, 
      address,
      phoneNumber,
      cart 
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({userId: req.user._id})
  return res.send(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
  res.json(orders)
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders
}