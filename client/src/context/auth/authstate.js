import React, { useReducer } from 'react'
import axios from 'axios'
import AuthReducer from '../auth/authreducer'
import AuthContext from '../auth/authcontext'
import setAuthToken from '../../utils/setAuthToken'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {

  const intialState = {
    token: localStorage.getItem('token'),
    isAuthencated: null,
    loading: true,
    user: null,
    error: null
  }
  const [state, dispatch] = useReducer(AuthReducer, intialState)

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    try {
      const res = await axios.get('/login')
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      })
    }
  }
  //login user

  const login = async userData => {
    const config = {
      header: {
        'Content-Type':'application/json'
      }
    }
    try {
      const res = await axios.post('/login', userData, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser()

    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      })
    }
  }

  // const setError = (error) => {
  //   dispatch({
  //     type: LOGIN_FAIL,
  //     payload: [{ msg: error }]
  //   })
  // }
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  
  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthencated: state.isAuthencated,
      user: state.user,
      error: state.error,
      loading: state.loading,
      login,
      loadUser,
      clearErrors,
      // setError
    }} >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState