import express from 'express'
const app = express()
import dotenv from 'dotenv'
// import connectDB from './config/database.js'
import mongoose from "mongoose";
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import genreRoutes from './routes/genreRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') })

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

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