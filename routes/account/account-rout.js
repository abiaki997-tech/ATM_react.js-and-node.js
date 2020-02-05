require('dotenv').config()
const express =require('express')
const router= new express.Router()
const bcrypt=require('bcryptjs')
const Account = require('../../model/Account/account')
const User = require('../../model/user/user')
const auth = require('../../middleware/auth')



//deposit
router.post('/deposit/create',auth,async (req, res) => {
    
    const {Amount} = req.body
  
    const AccUser=await Account.findOne({ Owner:req.user._id })

    //create new Account
     if(!AccUser){
            const AccHolder= new Account({
              cardNumber:req.user.cardNumber,
              money:Amount,
              Owner:req.user._id
          })

        try{
            await AccHolder.save()
            return res.status(201).send(AccHolder)
          }
          catch(e){
            return res.status(404).send({error:["not found"]})
          }
    }
     
 else{
 // add existing account
    try{

        let oldMoney = AccUser.money;
        let resp =await AccUser.updateOne({money: (parseInt(oldMoney) + parseInt(Amount))})

        if(!resp){ throw new Error  }
        return res.status(200).send({  msg:"deposit successful "});

     }

   catch(e)
    {
        return res.status(500).send({error:["Server error"]})
    }

 }     
  })


  //withdraw
 router.post('/withdraw',auth, async(req, res)=> {

    let {Amount} = req.body

try{
    const AccUser=await Account.findOne({ Owner:req.user._id })

    if(!AccUser){
      return res.status(404).send({error:["User not found"]})
       } 
       
    let oldMoney = AccUser.money;

    if (parseInt(oldMoney) < parseInt(Amount)) {
       return res.status(401).send({ error:["Account balance is low" ]  });
       } 

    else {

    let resp =await AccUser.updateOne({money: (parseInt(oldMoney) - parseInt(Amount))})
   
    if(!resp){ throw new Error }

    return res.status(200).send({ msg:"withdraw successful ", money: AccUser.money });
      
    }
  } 
catch(e)
    {
      res.status(500).send({error:["Server error"]})
    }          
});


//balancecheck
router.get('/balancecheck',auth,async(req,res)=>{

  try
  {
     const AccUser=await Account.findOne({ Owner:req.user._id })
  // console.log(AccUser)
      if(!AccUser){
        return res.status(404).send({error:["User not found"]})
      }

      let oldMoney = AccUser.money;
  //  console.log(oldMoney)
  
      return res.status(200).send({msg:[oldMoney]})
 }
catch(error)
  {
    return res.status(500).send({error:["server error"]})
  }
})

//pinchange
router.post('/pinChange', async(req, res)=> {

  let {pinNumber,cardNumber}=req.body

  try{

     const AccUser=await User.findOne({cardNumber})

      if(AccUser){

        let pinhash = await bcrypt.hash(pinNumber,8)

        let resp =await AccUser.updateOne({  pinNumber:pinhash })
          
        if(!resp){ throw new Error }
          
        return res.status(201).send({  msg:["successful change"] });
     }

        return res.status(404).send({error:["Un authorized"]})
  } 
catch(err)
{
  return res.status(500).send({error:["server error"]})
 }
      
 
});

  module.exports=router
