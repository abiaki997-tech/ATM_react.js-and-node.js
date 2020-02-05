import React, { useReducer } from 'react'
import axios from 'axios'
import AccReducer from '../account/accreducer'
import AccountContext from '../account/acc_context'
// import setAuthToken from '../../utils/setAuthToken'

import {
  DEPOSIT_SUCCESS,
  DEPOSIT_FAIL,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
  GETBALANCE_FAIL,
  GETBALANCE_SUCCESS,
  PINCHANGE_SUCCESS,
  PINCHANGE_FAIL,
  CLEAR_ERRORS
} from '../types'

const AccState = (props) =>{

  const intialState = {
    isdeposit: null,
    iswithdraw:null,
    isbalcheck:null,
    ispinchange:null,
    balavailable:'',
    error: null
  }
  const [state, dispatch] = useReducer(AccReducer, intialState)

  const deposit = async (money) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/account/deposit/create',money , config)
      dispatch({
        type:DEPOSIT_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: DEPOSIT_FAIL,
        payload: err.response.data
      })
    }
  }

  const withdraw = async (amount) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/account/withdraw',amount , config)
      dispatch({
        type:WITHDRAW_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: WITHDRAW_FAIL,
        payload: err.response.data
      })
    }
  }
  const balancecheck = async () => {
    try {
      const res = await axios.get('/account/balancecheck')
      
      dispatch({
        type:GETBALANCE_SUCCESS,
        payload:res.data.msg[0]
      })
    } catch (err) {
      dispatch({
        type: GETBALANCE_FAIL,
        payload: err.response.data
      })
    }
  }

  const pinChange = async (data) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/account/pinChange',data,config)
      dispatch({
        type:PINCHANGE_SUCCESS,
        payload:res.data.msg
      })
    } catch (err) {
      dispatch({
        type: PINCHANGE_FAIL,
        payload: err.response.data
      })
    }
  }


  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  
  return (
    <AccountContext.Provider value={{
      isdeposit: state.isdeposit,
      iswithdraw:state.iswithdraw,
      isbalcheck:state.isbalcheck,
      ispinchange:state.ispinchange,
      balavailable:state.balavailable,
      error: state.error,
      deposit,
      withdraw,
      balancecheck,
      clearErrors,
      pinChange,
 


    }} >
      {props.children}
    </AccountContext.Provider>
  )
}

export default AccState