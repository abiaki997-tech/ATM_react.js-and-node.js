import React,{useState,useEffect,useContext} from 'react'
import './login.css'
import AuthContext from '../../context/auth/authcontext'
import {withRouter} from "react-router-dom";


function Login(props){
  const { login, isAuthencated, error, clearErrors } = useContext(AuthContext)

//  console.log(error)
//  if(error){
//   console.log(error[0].msg)
//  }

  useEffect(() => {
    if (isAuthencated) {
    props.history.push('/container')
    } 
  }, [isAuthencated, props.history])



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
    login({
      cardNumber,
      pinNumber
    })
   
    clearErrors()
  }

  return(
     <div>
       <h1>Welcome! Enter Card Details</h1>
       <form onSubmit={onsubmit}>
         <div >
           <input   name="cardNumber" 
                    className="form-inp" 
                    placeholder="Enter Card Number"
                    value={cardNumber}
                    onChange={onchange} 
                    type="string"  
                    required />
         </div>
         <div>
            <input  name="pinNumber"
                    className="form-inp" 
                    placeholder="Enter Pin" 
                    value={pinNumber}
                    onChange={onchange} 
                    type="string" 
                    required/>
         </div>
         <div>
             <input type="submit" 
                    value="Login" 
                    className="btn" />
         </div>
    </form>

{/* error message */}
            <div className="question">
                {error !== null && 
                  <button className="danger" type="button"  >{error[0].msg} 
                      <span onClick={() => clearErrors()}>X</span>
                  </button>}
            </div>

     </div>
  )
}

export default  withRouter(Login)