import React from 'react'
import AuthTemplate from '../components/templateAuthPage'
import { useAuth } from '../contexts/authContext'

function SignupPage() {
  const { signup } = useAuth()
  return (
    <AuthTemplate
      authMethod={signup}
      successRoutePath="/signin"
      titleMsg="Register for Movie App"
      buttonMsg="Register"
      buttomMsg="Already have an account now"
      bottomRoutePath="/signin" />
  )
}

export default SignupPage
