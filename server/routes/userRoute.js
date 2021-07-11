import express from "express"
import User from "../model/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const router=express.Router()


router.post("/signup",(req,res)=>{
   const {name,email,password,pic}=req.body
   console.log("signup executing");
   if(!name ||!email||!password){ 
        
    return res.status(404).json({error:"please enter all the fields"})
}else{
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(404).json({error:"user already exists"}).status(404)
    
        }
bcrypt.hash(password,12)
.then(hashedPasssword=>{
    const user=new User({
        email,
        password:hashedPasssword,
        name,
        pic
    })
    user.save()
    .then(user=>{
        res.json({message:"saved successfully"})
})
.catch(err=>{
    console.log(err);
})
})  

})
}
})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(404).json({message:"please enter both the fields"})
 }
 User.findOne({email:email},(err,savedUser)=>{
  if(!savedUser){
      res.json({message:"invalid user"})
  }
     else{
bcrypt.compare(password,savedUser.password)
.then(doMatch=>{
    if(doMatch){
        //res.json({message:"successfully logged in"})
const token=jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
    }
    else{
        res.json({error:"invalid user or password"})
    }
    if(err){
        console.log(err);
    }
})
}
 })
 
})


router.get("/protected",(req,res)=>{
    var id="609947b69b0652a3c4d212f1"
    User.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
    })
})


export default router