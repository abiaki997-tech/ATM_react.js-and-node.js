import React,{useContext} from 'react'
import AccountContext from '../../context/account/acc_context'


function Deposit(){

  const {balancecheck, balavailable ,isbalcheck,error, clearErrors } = useContext(AccountContext)
 
  const onsubmit = ()=> {
     balancecheck()
  }

  return(
        <div>
            <div>
              <input type="submit" 
                    value="BalanceCheck" 
                    className="btn" 
                    onClick={onsubmit}/>
            </div>     

                 {/*Balance show message  */}
            <div >
              {isbalcheck === true && <button style={{margin:"10px",width:"20%" ,backgroundColor:"green" , padding:"10px",alignItems:"center"}}>{balavailable}
                 <span style={{ margin:"10px",color:"red"}} onClick={ ()=>clearErrors()}>X</span>
              </button>}
            </div> 

                {/*Error Message */}
        {/* <div className="question">
            {error !== null && 
              <button>{error[0]} 
                  <span onClick={() => clearErrors()}>X</span>
              </button>}
         </div>         */}
       
          
        </div>
  )
}

export default Deposit