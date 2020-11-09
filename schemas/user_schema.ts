import mongoose from "../utils/db";


const user_schema= new mongoose.Schema({
    
  USER_NAME: {
    type: String,
    required: true,
  },
  AGE: {
    type: Number,
    required: true,
  },
  FULL_NAME: {
    type: String,
    required: true,
  },
  LOCATION: {
      type:String,
      required:true,

  },
 CONTACT_NUMBER: {
      type:Number,
      default:'NOT AVAILABLE'
  },
  PASSWORD:{
    type:String,
    required:true,
  },
  EMAIL:{
    type:String,
    required:true,
  }

}
)

export default mongoose.model("USERS", user_schema);