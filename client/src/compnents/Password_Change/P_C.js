import React,{useContext,useEffect,useState} from 'react'
import AccountContext from '../../context/account/acc_context'
import {withRouter} from "react-router-dom";


function Password(props){

  const {ispinchange,pinChange, error, clearErrors } = useContext(AccountContext)

   
   useEffect(() => {
     if (ispinchange) {
     props.history.push('/container')
       clearErrors()
     } 
   }, [ispinchange, props.history])
 
 
 
   const [User,setUser] = useState({
     cardNumber:'',
     newPin:''
   })
   
   
   const {cardNumber,newPin}=User
   
   const onchange = e => {
     setUser({
       ...User,
       [e.target.name]: e.target.value
     })
   if (error !== null) { clearErrors() } 
   }
 
   const onsubmit = e => {
     e.preventDefault()
     pinChange({
       cardNumber,
       newPin
     })
     clearErrors()
   }
   console.log(error)

  return(
    <div>
    <h1>PinChange</h1>
    <form onSubmit={onsubmit}>
      <div >
        <input  
                 name="cardNumber" 
                 className="form-inp" 
                 placeholder="Enter Card Number"
                 value={cardNumber}
                 onChange={onchange} 
                 type="string"  required />
      </div>
      <div>
         <input  name="newpin"
                 className="form-inp" 
                 placeholder="Enter new Pin" 
                 value={newPin}
                 onChange={onchange} 
                 type="string" 
                 required/>
      </div>
      <div>
          <input type="submit" 
                 value="Submit" 
                 className="btn" />
      </div>
    </form>
  </div>
  )
}

export default withRouter(Password) 