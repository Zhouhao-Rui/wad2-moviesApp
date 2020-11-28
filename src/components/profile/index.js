import React from 'react'
import "../../globals/fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../../contexts/authContext'
import { useSelector, shallowEqual } from 'react-redux'
import Carousel from '../carousel'

library.add(faUserCircle)
function Profile() {
  const { favorites } = useSelector(state => ({
    favorites: state.getIn(["movies", "favorites"])
  }), shallowEqual)
  const { currentUser } = useAuth()

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
            <Carousel items={favorites} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
