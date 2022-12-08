import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genre: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Genre',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product