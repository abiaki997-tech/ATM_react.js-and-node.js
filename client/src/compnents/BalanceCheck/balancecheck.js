import React,{useEffect, useContext} from 'react'
import AccountContext from '../../context/account/acc_context'


function Deposit(){

  const {  balancecheck, balavailable ,error, clearErrors } = useContext(AccountContext)
 
  
  useEffect(() => {
  balancecheck()
  }, [])

  const onsubmit = e => {
    e.preventDefault()
     balancecheck()
  }


  return(
        <div>
            <div>
              <input type="submit" 
                    value="BalanceCheck" 
                    className="btn" 
                    onChange={onsubmit}/>
               </div>     
                    
              <div>
                <p>{balavailable}</p>
              </div>         

        <div className="question">
            {error !== null && 
              <button>{error} 
                  <span onClick={() => clearErrors()}>X</span>
              </button>}
         </div>        
       
          
        </div>
  )
}

export default Deposit