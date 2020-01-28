import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS
} from '../types'

export default (state, { type, payload }) => {
  switch (type) {

    case USER_LOADED:
      return {
        ...state,
        isAuthencated: true,
        user: payload,
        loading: false,
        error: null
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthencated: true,
        loading: false,
        error: null
      }
    case LOGIN_FAIL:
      return{
        ...payload
      }
    case AUTH_ERROR:
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}