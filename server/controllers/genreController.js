import Genre from '../models/Genre.js'
import asyncHandler from 'express-async-handler'

// FETCH ALL Genre GET /api/products
const getGenre = asyncHandler(async(req, res) => {
  const genre = await Genre.find()
  res.json(genre)
})


// Create Genre POST /api/genre/
// private // only Admin

const createGenre = asyncHandler(async(req, res) => {
  const product = new Genre({
    title: req.body.title,
  })
  
  const createdGenre = await product.save()
  res.status(201).json(createdGenre)
})

export {
  getGenre,
  createGenre
}