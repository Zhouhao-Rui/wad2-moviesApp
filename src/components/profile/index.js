import React, { useEffect, useState } from 'react'
import "../../globals/fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from '../carousel'
import { getUserFavors } from '../../api/tmdb-api';

library.add(faUserCircle)
function Profile() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    getUserFavors().then(res => {
      setFavorites(res)
    })
  }, [])

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
            <p className="font-weight-bold ml-2">UserName: {window.localStorage.getItem("username")}</p>
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
