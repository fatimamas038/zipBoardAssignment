import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   email:{
       type:String,
       required:true,
   },
   password:{
       type:String,
    required:true,
   },
   
   pic:{
       type:String,
       default:"https://res.cloudinary.com/ddf8agjjc/image/upload/v1621334380/images_jabmvk.jpg"
   }
})

const User=mongoose.model("User",userSchema)
export default User