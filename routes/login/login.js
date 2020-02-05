require('dotenv').config()
const express =require('express')
const router= new express.Router()
const User = require('../../model/user/user')
const { check, validationResult } = require('express-validator')




router.post('/',
  [
    
    check('cardNumber', 'CardNumber at 10 number only!').isLength({ min:10 ,max:10}),
    check('pinNumber', 'PinNumber at 4 number only!').isLength({ min:4,max:10 })

  ],
  async (req, res) => {

    const errors = validationResult(req)

    // console.error(errors.array() )

    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() })
      
    }
    
      // console.log(req.body)
      
     
    const {cardNumber,pinNumber} = req.body

try {
      // user already exits ?
      let user = await User.findOne({ cardNumber })

      // console.log(user)

      if (user) {
        //existing user
        try{
     
          const existinguser=await User.findByCredtinals(user,{pinNumber})
          // console.log(user)
          //token return (specific user above)
          const token=await existinguser.generateAuthToken()
          return  res.send({existinguser,token})//return properties
      }
      catch(e){
            return res.status(400).send({error:[{msg:"Unable to login"}]})
       }
        
      }
      //create new user
      const  newuser = new User({
            cardNumber,
            pinNumber
            })

      // password encryption
      //generate token
      await newuser.save()
       const token= await newuser.generateAuthToken()
       return res.status(201).send({user,token})
     
    } 
catch (err) {
      
     return res.status(500).send({error:["server error"]})
}
  })

  
  module.exports=router