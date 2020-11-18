import React from 'react'
import { Formik } from 'formik'
import { useAuth } from '../../contexts/authContext'
import { Link, withRouter } from 'react-router-dom'

function Signin({ history }) {
  const { signin } = useAuth()
  const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = "email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = "password is required"
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 chars or more"
    }
    return errors
  }
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validate}
        onSubmit={async values => {
          try {
            await signin(values.email, values.password)
            console.log('Login Success!')
            history.push('/')
          } catch {
            alert('Fail to login')
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <div className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
              <form
                onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">Login for Movie</h1>
                <div className="form-group">
                  <label htmlFor="email">Email address: </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <p className="text-danger">{errors.email}</p>
                <div className="form-group">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="pawword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <p className="text-danger">{errors.password}</p>
                <div className="text-center">
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    Login
                </button>
                </div>
                <div className="w-100 text-center mt-2">
                  Don't have an account right now? <Link to="/signup">Sign up</Link>
                </div>
              </form>
            </div>
          )}
      </Formik>
    </div>
  )
}

export default withRouter(Signin)
