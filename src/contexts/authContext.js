import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("")
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    // callback function to unsubscribe the onAuthStateChange event
    const unsubsciber = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    // onMount
    return unsubsciber
  }, [])

  const value = {
    currentUser,
    signup,
    signin
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
