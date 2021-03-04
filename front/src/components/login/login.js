import React, { useState, useContext } from 'react'
import LoginForm from './loginForm.js'
import RegisterForm from './registerForm.js'
import {IsLoggedContext} from '../../App'

export default function Login(props) { //remove props
  const [isLogginActive, setIsLogginActive] = useState(true)
  const isLoggedContext = useContext(IsLoggedContext)

  if (!isLoggedContext.isLoggedState) {
    return(
      <>
        { isLogginActive && <LoginForm isLogginActive={isLogginActive} setIsLogginActive={setIsLogginActive} />}
        { !isLogginActive && <RegisterForm />}
      </>
    )
  } else {
    return(
      <p>
        LOG OUT screen
      </p>
    )
  }
}