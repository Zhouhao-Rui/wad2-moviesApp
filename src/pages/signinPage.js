import React from 'react'
import AuthTemplate from '../components/templateAuthPage'
import { useAuth } from '../contexts/authContext'

function SigninPage() {
  const { signin } = useAuth()
  return (
    <AuthTemplate
      authMethod={signin}
      successRoutePath="/"
      titleMsg="Login for Movie App"
      buttonMsg="Login"
      buttomMsg="Do not have an account right now"
      bottomRoutePath="/signup" />
  )
}

export default SigninPage
