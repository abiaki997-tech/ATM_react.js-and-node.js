require('dotenv').config()
const express =require('express')
const router= new express.Router()
const Account = require('../../model/Account/account')
const auth = require('../../middleware/auth')


//deposit
router.post('/deposit',auth,async (req, res) => {
    
    const {money} = req.body
    
 try{
     const AccUser=await Account.findOne({ owner:req.user._id,cardNumber:req.user.cardNumber })
     
      if(!AccUser){
        return res.status(404).send({msg:"User not found"})
            } 
     
      let oldMoney = AccUser.money;

      let resp =await AccUser.updateOne({money: (parseInt(oldMoney) + parseInt(money))})
    
      if(!resp){
        throw new Error
             }
      return res.status(200).send({  msg:"deposit successful ", money: (parseInt(oldMoney) + parseInt(money)) });
   }
 catch(e)
     {
        return res.status(500).send({error:"Server error"})
     }

  })

  //withdraw
 router.post('/withdraw',auth, async(req, res)=> {

    let {withdraw} = req.body

try{
    const AccUser=await Account.findOne({ owner:req.user._id })

    if(!AccUser){
      return res.status(404).send({msg:"User not found"})
       } 

    let oldMoney = AccUser.money;

    if (parseInt(oldMoney) < parseInt(withdraw)) {
          res.send({ err: 'true', msg:"Account balance is low" });
       } 
   else 
   {
    let resp =await AccUser.updateOne({money: (parseInt(oldMoney) - parseInt(withdraw))})
   
    if(!resp){ throw new Error }

    res.status(200).send({ msg:"withdraw successful ", money: (parseInt(oldMoney) - parseInt(withdraw)) });
     }
  }
catch(e)
    {
      res.status(500).send({error:"Server error"})
    }
           
});

//balancecheck
router.post('/balacheck',auth,async(req,res)=>{

  try
  {
     const AccUser=await Account.findOne({ owner:req.user._id })
  
      if(!AccUser){
        return res.status(404).send({error:"User not found"})
      }
      let oldMoney = AccUser.money;

      return res.status(200).send({msg:oldMoney})
 }
catch(err)
    {
      return res.status(500).send({error:"server error"})
    }
})

//pinchange
router.post('/pinChange',auth, async(req, res)=> {
  let {newPin}=req.body

  try{
        const AccUser=await Account.findOne({ owner:req.user._id })
        
      if(!AccUser){
            return res.status(404).send({error:"User not found"})
      } 

      let resp =await AccUser.updateOne({  pinNumber: newPin })

      if(!resp){
        return res.status.send({  error:"not update" });
      }
        return res.send({  msg:"successful change" });
  }

 catch(err)
  {
    return res.status(500).send({error:"server error"})
    }
});

  module.exports=router
