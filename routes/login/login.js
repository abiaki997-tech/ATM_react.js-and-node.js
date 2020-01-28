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
    console.error(errors.array() )
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() })
      
    }
    

      // if no, create the user in the db
     
    const {cardNumber,pinNumber} = req.body

    try {
      // user already exits ?
      let user = await User.findOne({ cardNumber })
      console.log(user)
      if (user) {
        return res.status(400).json({ error: [{ msg: 'one time login  and type another cardNumber!' }] })
      }
   user = new User({
       cardNumber,
       pinNumber
      })

      // password encryption
      //generate token
      await user.save()
      const token= await user.generateAuthToken()
      res.status(201).send({user,token})
     
    } catch (error) {
      console.error(error.message)
      res.status(500).send('server error')
    }
  })

  
  module.exports=router