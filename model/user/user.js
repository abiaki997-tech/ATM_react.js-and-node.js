require('dotenv').config()
const mongoose = require('mongoose')
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

userSchema.virtual('Accounts',{
  ref:'Account',
  localField:'_id',
  foreignField:'Owner'
})


userSchema.methods.generateAuthToken = async function () {
  const user = this
 
  const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  
  await user.save()

  return token
}

// check existing user password
userSchema.statics.findByCredtinals=async(user,{pinNumber})=>{
  //find user
  const existinguser=user

  const passwordcheck = await bcrypt.compare(pinNumber,existinguser.pinNumber)

  if(!passwordcheck){
    throw new Error('Unable to login')
  }

  return existinguser
}


 // Hash the plain text password before saving
userSchema.pre('save', async function (next) {

  const user = this

  if(user.isModified('pinNumber')) //password hashed once
  { 
    user.pinNumber= await bcrypt.hash(user.pinNumber,8)
  }
  next()
})




const User= mongoose.model('User', userSchema)

module.exports=User