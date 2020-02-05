import React,{useState,useEffect, useContext} from 'react'
// import './deposit.css'
import AccountContext from '../../context/account/acc_context'


function Withdraw(){

  const {iswithdraw,withdraw, error, clearErrors } = useContext(AccountContext)

 if(error !==null){
  console.log(error[0])
 }
  
  
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
    if (error !== null) { clearErrors() }
  }

  // form submit
  const onsubmit = e => {
    e.preventDefault()
    withdraw({
      Amount
    })
   
    // setWA({Amount:''})
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
                    type="string" 
                    required />
         
             <button  className="btn" >Withdraw</button> 
                  
                   
          </form>

      {/* error message */}
          <div className="question">
                
                  {error !== null && 
                    <button className="danger" type="button">{error[0]} 
                        <span onClick={() => clearErrors()}>X</span>
                   </button>}            
          </div>
          
        </div>
  )
}

export default Withdraw