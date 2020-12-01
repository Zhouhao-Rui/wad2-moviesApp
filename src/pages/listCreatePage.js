import React, { useState } from 'react'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import SearchHeader from '../components/tv/searchHeader'
import { createList } from '../api/tmdb-api'

function ListCreatePage({ history }) {
  const [errorMsg, setErrorMsg] = useState("")
  const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = "name is required"
    }
    if (!values.description) {
      errors.description = "description is required"
    } else if (values.description.length < 10) {
      errors.description = "Must be 10 chars or more"
    }
    return errors
  }
  return (
    <div>
      <SearchHeader />
      <div>
        <Formik
          initialValues={{ name: '', description: '' }}
          validate={validate}
          onSubmit={async values => {
            try {
              createList(values)
              history.push('/list')
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
                  <h1 className="text-center mb-4">Create a list</h1>
                  <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <p className="text-danger">{errors.name}</p>
                  <div className="form-group">
                    <label htmlFor="password">Description: </label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      id="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </div>
                  <p className="text-danger">{errors.description}</p>
                  <div className="text-center">
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                      Create
                  </button>
                  </div>
                </form>
              </div>
            )}
        </Formik>
      </div>
    </div>
  )
}

export default withRouter(ListCreatePage)
