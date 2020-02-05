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

export default (state, { type, payload }) => {
  switch (type) {

    case DEPOSIT_SUCCESS:
      return {
        ...state,
        ...payload,
        isdeposit:true,
        error: null
      }
    case DEPOSIT_FAIL:
      return{
        ...payload
      }
    case WITHDRAW_SUCCESS:
      return{
         ...state,
         ...payload,
         iswithdraw:true,
         error:null
      }
    case WITHDRAW_FAIL:return{
     ...payload
    }
    case GETBALANCE_SUCCESS:
      return{
           ...state,
           balavailable:payload,
           error:null,
           isbalcheck:true
      }
    case GETBALANCE_FAIL : return {
      ...payload
    }
    case PINCHANGE_SUCCESS:
      return{
           ...state,
           error:null,
           ispinchange:true
      }
    case PINCHANGE_FAIL : 
    console.log(payload)
    return {
      ...payload
      
    }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        isbalcheck:null
      }
    default:
      return state
  }
}