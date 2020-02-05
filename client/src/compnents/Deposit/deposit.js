import React,{useState,useEffect, useContext} from 'react'
import './deposit.css'
import AccountContext from '../../context/account/acc_context'


function Deposit(){

  const {isdeposit,deposit, error, clearErrors } = useContext(AccountContext)
 
  
  useEffect(() => {
    if (isdeposit) {
      clearErrors()
    } 
  }, [isdeposit])

  const [DA,setDA] = useState({
    Amount:''
  })

  const {Amount}=DA
  
  const onchange = e => {
    setDA({
      ...DA,
      [e.target.name]: e.target.value
    })
  }

  const onsubmit = e => {
    e.preventDefault()
    deposit({
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
                    value="Deposit" 
                    className="btn" />
          </form>

          {/* <div className="question">
             {error !== null && 
              <button className="danger" type="button">{error[0]} 
                  <span onClick={() => clearErrors()}>X</span>
               </button>}
          </div> */}

        </div>
  )
}

export default Deposit