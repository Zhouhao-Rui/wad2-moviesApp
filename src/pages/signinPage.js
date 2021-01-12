import React from 'react'
import AuthTemplate from '../components/templateAuthPage'
import { signin } from '../api/tmdb-api'

function SigninPage() {
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
