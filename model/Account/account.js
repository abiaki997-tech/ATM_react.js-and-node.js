const mongoose = require('mongoose')
require('dotenv').config()

const AccountSchema = new mongoose.Schema({

cardNumber: {
  type: String,
  required: true
},
money: {
    type: String,
    required: true
},
owner:{
  type:mongoose.Schema.Types.ObjectId,
  required: true,
  ref:'User'
},
},
{
timestamps:true
})
const Account= mongoose.model('Account', AccountSchema)

module.exports=Account