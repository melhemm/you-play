import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  cart: [],
}, 
{
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order
