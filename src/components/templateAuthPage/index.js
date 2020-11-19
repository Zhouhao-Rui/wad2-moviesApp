import React, { useState } from 'react'
import { Formik } from 'formik'
import { withRouter, Link } from 'react-router-dom'

function AuthTemplate(props) {
  const { authMethod, successRoutePath, titleMsg, buttonMsg, buttomMsg, bottomRoutePath, history } = props
  const [errorMsg, setErrorMsg] = useState("")
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
            await authMethod(values.email, values.password)
            history.push(successRoutePath)
          } catch (e) {
            setErrorMsg(e.message)
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
                <div className=" alert-danger">
                  {errorMsg}
                </div>
                <h1 className="text-center mb-4">{titleMsg}</h1>
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
                    {buttonMsg}
                  </button>
                </div>
                <div className="w-100 text-center mt-2">
                  {buttomMsg} <Link to={bottomRoutePath}>Sign up</Link>
                </div>
              </form>
            </div>
          )}
      </Formik>
    </div>
  )
}

export default withRouter(AuthTemplate)
