import React, { useState } from 'react'
import { Formik } from 'formik'
import { withRouter, Link } from 'react-router-dom'

function AuthTemplate(props) {
  const { authMethod, successRoutePath, titleMsg, buttonMsg, buttomMsg, bottomRoutePath, history } = props
  const [errorMsg, setErrorMsg] = useState("")
  const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = "username is required"
    }

    if (!values.password) {
      errors.password = "password is required"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,300}$/.test(values.password)) {
      errors.password = "password invalid"
    }
    return errors
  }
  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={validate}
        onSubmit={async values => {
          try {
            const res = await authMethod(values)
            if (res.code === 401) {
              setErrorMsg(res.msg)
            }else {
              window.localStorage.setItem("username", res.username)
              window.localStorage.setItem("token", res.token)
              history.push(successRoutePath)
            }
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
                  <label htmlFor="username">userName: </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
                <p className="text-danger" data-cy="email-warning">{errors.email}</p>
                <div className="form-group">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <p className="text-danger" data-cy="password-warning">{errors.password}</p>
                <div className="text-center">
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {buttonMsg}
                  </button>
                </div>
                <div className="w-100 text-center mt-2 hint">
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
