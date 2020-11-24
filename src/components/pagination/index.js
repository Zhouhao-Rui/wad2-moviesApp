import React, { useState } from 'react'

function Pagination({ handleNavigation }) {
  const [pageNums, setPageNums] = useState([1, 2, 3])

  const [currentPage, setCurrentPage] = useState(1)

  const nextNavigation = () => {
    setCurrentPage(currentPage + 1)
    handleNavigation(currentPage + 1)

    setPageNums(pageNums.map(num => num + 1))
  }

  const prevNavigation = () => {
    if (currentPage <= 1) {
      return 
    }
    setCurrentPage(currentPage - 1)
    handleNavigation(currentPage - 1)

    setPageNums(pageNums.map(num => num - 1))
  }

  const navigateToPage = (num) => {
    setCurrentPage(num)
    handleNavigation(num)
  }
  console.log("pageNums", pageNums)
  console.log("currentPage", currentPage)
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4" style={{ cursor: "pointer" }}>
      <ul className="pagination">
        <li className="page-item"><p className="page-link" onClick={e =>prevNavigation()}>Previous</p></li>
        {
          pageNums.map((num, index) => {
            if (num === currentPage) {
              return <li className="page-item active" key={index}><p className="page-link">{num}</p></li>
            }
            return <li className="page-item" key={index}><p className="page-link" onClick={e => navigateToPage(num)}>{num}</p></li>
          })
        }
        <li className="page-item"><p className="page-link" onClick={e => nextNavigation()}>Next</p></li>
      </ul>
    </nav>
  )
}

export default Pagination
