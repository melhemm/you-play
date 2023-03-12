import mongoose from "mongoose";

const genreSchema = mongoose.Schema({
  title: {
    type: String,
  }
}, {
  timestamps: true
})

const Genre = mongoose.model('Genre', genreSchema)

export default Genre
