import React from 'react'

function Pagination() {
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4" style={{ cursor: "pointer" }}>
      <ul className="pagination">
        <li className="page-item"><p className="page-link">Previous</p></li>
        <li className="page-iten"><p className="page-link">1</p></li>
        <li className="page-iten"><p className="page-link">2</p></li>
        <li className="page-iten"><p className="page-link">3</p></li>
        <li className="page-item"><p className="page-link">Next</p></li>
      </ul>
    </nav>
  )
}

export default Pagination
