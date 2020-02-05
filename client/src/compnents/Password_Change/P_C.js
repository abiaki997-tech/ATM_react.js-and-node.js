import React,{useContext,useEffect,useState} from 'react'
import AccountContext from '../../context/account/acc_context'
import {withRouter} from "react-router-dom";


function Password(props){

  const {ispinchange,pinChange, error, clearErrors } = useContext(AccountContext)

   
   useEffect(() => {
     if (ispinchange) {
     props.history.push('/')
       clearErrors()
     } 
   }, [ispinchange, props.history])
 
  
 
 
   const [User,setUser] = useState({
     cardNumber:'',
     pinNumber:''
   })
   
   
   const {cardNumber,pinNumber}=User
   
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
       pinNumber
     })
     clearErrors()
   }


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
         <input  name="pinNumber"
                 className="form-inp" 
                 placeholder="Enter new Pin" 
                 value={pinNumber}
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

      <div className="question">
             {error !== null && 
              <button className="danger" type="button">{error[0]} 
                  <span onClick={() => clearErrors()}>X</span>
               </button>}
       </div>
      
  </div>
  )
}

export default withRouter(Password) 