import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const { currentUser } = useAuth()
  return (
    <Route
      {...routeProps}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }}
    ></Route>
  )
}

export default PrivateRoute