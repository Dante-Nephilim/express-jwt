import mongoose from "../utils/db";


const book_schema= new mongoose.Schema({
    
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  review: {
      type:String,
      required:true,

  },
  rating: {
      type:Number,
      default:'not rated'
  }
}
)

export default mongoose.model("BOOKS", book_schema);