import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { changeUpcomingCurrentPage, changeMovieCurrentPage, changeUpcomingPageNums, changeMoviePageNums } from '../movieStore/actionCreators'

function Pagination({ handleNavigation, type }) {
  const { upcomingPageNums, moviePageNums, currentUpcomingPage, currentMoviePage } = useSelector(state => ({
    upcomingPageNums: state.getIn(["movies", "upcomingPageNums"]),
    moviePageNums: state.getIn(["movies", "moviePageNums"]),
    currentUpcomingPage: state.getIn(["movies", "currentUpcomingPage"]),
    currentMoviePage: state.getIn(["movies", "currentMoviePage"])
  }), shallowEqual)
  const dispatch = useDispatch()

  const nextNavigation = () => {
    if (type === 'movie') {
      dispatch(changeMovieCurrentPage(currentMoviePage + 1))
      handleNavigation(currentMoviePage + 1)

      const new_pageNums = moviePageNums && moviePageNums.map(num => num + 1)
      dispatch(changeMoviePageNums(new_pageNums))
    } else {
      dispatch(changeUpcomingCurrentPage(currentUpcomingPage + 1))
      handleNavigation(currentUpcomingPage + 1)

      const new_pageNums = upcomingPageNums && upcomingPageNums.map(num => num + 1)
      dispatch(changeUpcomingPageNums(new_pageNums))
    }

  }

  const prevNavigation = () => {
    if (type === 'movie') {
      if (currentMoviePage <= 1) {
        return
      }
      dispatch(changeMovieCurrentPage(currentMoviePage - 1))
      handleNavigation(currentMoviePage - 1)
      const new_pageNums = moviePageNums && moviePageNums.map(num => num - 1)
      dispatch(changeMoviePageNums(new_pageNums))
    } else {
      if (currentUpcomingPage <= 1){
        return 
      }
      dispatch(changeUpcomingCurrentPage(currentUpcomingPage - 1))
      handleNavigation(currentUpcomingPage - 1)
      const new_pageNums = upcomingPageNums && upcomingPageNums.map(num => num - 1)
      dispatch(changeUpcomingPageNums(new_pageNums))
    }

  }

  const navigateToPage = (num) => {
    if (type === 'movie') {
      dispatch(changeMovieCurrentPage(num))
      handleNavigation(num)
    } else {
      dispatch(changeUpcomingCurrentPage(num))
      handleNavigation(num)
    }

  }
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4" style={{ cursor: "pointer" }}>
      <ul className="pagination">
        <li className="page-item"><p className="page-link" data-cy="pre-link" onClick={e => prevNavigation()}>Previous</p></li>
        {
          type === 'movie' ? moviePageNums && moviePageNums.map((num, index) => {
            if (num === currentMoviePage) {
              return <li className="page-item active" key={index} data-cy="page-active"><p className="page-link">{num}</p></li>
            }
            return <li className="page-item" key={index}><p className="page-link" onClick={e => navigateToPage(num)}>{num}</p></li>
          }) : upcomingPageNums && upcomingPageNums.map((num, index) => {
            if (num === currentUpcomingPage) {
              return <li className="page-item active" data-cy="page-active" key={index}><p className="page-link">{num}</p></li>
            }
            return <li className="page-item" key={index}><p className="page-link" onClick={e => navigateToPage(num)}>{num}</p></li>
          })
        }
        <li className="page-item"><p className="page-link" data-cy="next-link" onClick={e => nextNavigation()}>Next</p></li>
      </ul>
    </nav>
  )
}

export default Pagination
