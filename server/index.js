import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import genreRoutes from './routes/genreRoutes.js'

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/genre', genreRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started in mode on port ${PORT}`))