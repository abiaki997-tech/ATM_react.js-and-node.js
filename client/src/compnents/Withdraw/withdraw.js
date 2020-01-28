import React,{useState,useEffect, useContext} from 'react'
// import './deposit.css'
import AccountContext from '../../context/account/acc_context'
// import {withRouter} from "react-router-dom";

function Withdraw(){

  const {iswithdraw,withdraw, error, clearErrors } = useContext(AccountContext)
 
  
  useEffect(() => {
    if (iswithdraw) {
      clearErrors()
    } 
  }, [iswithdraw])

  const [WA,setWA] = useState({
    Amount:''
  })

  const {Amount}=WA
  
  const onchange = e => {
    setWA({
      ...WA,
      [e.target.name]: e.target.value
    })
  }

  const onsubmit = e => {
    e.preventDefault()
    withdraw({
      Amount
    })
    clearErrors()
  }

  
  return(
        <div>
          <form onSubmit={onsubmit}>

                <input name="Amount" 
                    className="form-inp" 
                    placeholder="Enter Amount"
                    value={Amount}
                    onChange={onchange} 
                    type="string" required />
         
             <input type="submit" 
                    value="Withdraw" 
                    className="btn" />
          </form>

          <div className="question">
                  {error !== null && 
                    <button className="danger" type="button">{error} 
                        <span onClick={() => clearErrors()}>X</span>
                    </button>}    
          </div>
          
        </div>
  )
}

export default Withdraw