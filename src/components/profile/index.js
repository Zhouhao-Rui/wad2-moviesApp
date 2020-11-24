import React, { useState } from 'react'
import "../../globals/fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../../contexts/authContext'
import { Link } from 'react-router-dom';
import {useSelector, shallowEqual} from 'react-redux'

library.add(faUserCircle)
function Profile() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { favorites } = useSelector(state => ({
    favorites: state.getIn(["movies", "favorites"])
  }), shallowEqual)
  const { currentUser } = useAuth()

  const forwardIndex = (index) => {
    if (index < favorites.length - 1) {
      setCurrentIndex(index + 1)
    } else if (index === favorites.length - 1) {
      setCurrentIndex(0)
    }
  }

  const forward = () => {
    console.log(currentIndex)
    forwardIndex(currentIndex)
  }

  const backward = () => {
    console.log(currentIndex)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (currentIndex === 0) {
      setCurrentIndex(favorites.length - 1)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card w-25">
        <div className="card-body">
          <div className="d-flex flex-row mb-3 justify-content-center">
            <h2 className="text-center">Profile</h2>
            <FontAwesomeIcon
              icon={['fas', 'user-circle']}
              size="2x"
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="font-weight-bold ml-2">Email: {currentUser.email}</p>
            <p className="font-weight-bold ml-2 mt-4">Favorite Movies</p>
            <ol>
              {favorites.map(movie => {
                return <li key={movie.id}>{movie.title}</li>
              }).slice(0, 5)}
              ...
            </ol>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {(favorites.length > 0) ? favorites.map((movie, index) => (
                  index === currentIndex ?
                    <div key={movie.id} className="carousel-item active">
                      <Link to={`/movies/${movie.id}`}>
                        <img className="carousel-img" src={`https://image.tmdb.org/t/p/w500/${favorites[index].poster_path}`} style={{ width: "200px", height: "300px" }} alt="..." />
                      </Link>
                    </div>
                    :
                    <div key={movie.id} className="carousel-item">
                      <img className="carousel-img" src={`https://image.tmdb.org/t/p/w500/${favorites[index].poster_path}`} style={{ width: "200px", height: "300px" }} alt="..." />
                    </div>
                )) : ""}
              </div>
              <p className="carousel-control-prev" role="button" data-slide="prev" onClick={backward}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </p>
              <p className="carousel-control-next" role="button" data-slide="next" onClick={forward}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
