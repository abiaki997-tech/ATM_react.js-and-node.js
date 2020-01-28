import React from 'react'
import Deposit from '../Deposit/deposit'
import Withdraw from '../Withdraw/withdraw'
import Balance from '../BalanceCheck/balancecheck'
import './container.css'

function compnent(){
  return(
 <div className="container">
   <Deposit/>
   <Withdraw/>
   <Balance />
 </div>
  )
}

export default compnent;