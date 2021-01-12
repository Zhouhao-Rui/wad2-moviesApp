import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props => {
        return window.localStorage.getItem("username") ? <Component {...props} /> : <Redirect to="/signin" />
      }}
    ></Route>
  )
}

export default PrivateRoute