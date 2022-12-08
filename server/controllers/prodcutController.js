import Product from '../models/Product.js'
import asyncHandler from 'express-async-handler'

// FETCH ALL PRODUCTS GET /api/products
const getProducts = asyncHandler(async(req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    title: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({...keyword}).limit(pageSize)
  .skip(pageSize * (page - 1)).sort({createdAt: "descending"})

  res.json({products, count, page, pageSize, pages: Math.ceil(count / pageSize) })
})

// FETCH PRODUCT BY ID GET /api/products/:id

const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// Delete PRODUCT DELETE /api/products/:id
// private // only Admin

const deleteProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    await product.remove()
    res.json({message: 'Product removed'})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// Create PRODUCT POST /api/products/
// private // only Admin

const createProduct = asyncHandler(async(req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    genre: req.body.genre,
    description: req.body.description 
  })
  
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// Update PRODUCT PUT /api/products/:id
// private // only Admin

const updateProduct = asyncHandler(async(req, res) => {
  const {title, description, image, genre, price} = req.body
  const product = await Product.findById(req.params.id)
  if(product) {
    product.title = title
    product.description = description
    product.image = image
    product.genre = genre
    product.price = price
    
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
}