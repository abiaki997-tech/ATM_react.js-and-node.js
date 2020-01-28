
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema = new mongoose.Schema({

  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  pinNumber: {
    type: String,
    required: true
  },

  tokens:[{
    token:{
      type:String,
      required:true
    } 
  }]
})

userSchema.virtual('account',{
  ref:'Account',
  localField:'_id',
  foreignField:'owner'
})


userSchema.methods.generateAuthToken = async function () {
  const user = this
 
  const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  
  await user.save()

  return token
}


// // Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this
  
  if(user.isModified('pinNumber')){ //password hashed once
    user.pinNumber= await bcrypt.hash(user.pinNumber,8)
  }
  next()
})




const User= mongoose.model('User', userSchema)

module.exports=User