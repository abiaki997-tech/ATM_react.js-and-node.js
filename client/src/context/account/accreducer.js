import {
  DEPOSIT_SUCCESS,
  DEPOSIT_FAIL,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
  GETBALANCE_FAIL,
  GETBALANCE_SUCCESS,
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
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}