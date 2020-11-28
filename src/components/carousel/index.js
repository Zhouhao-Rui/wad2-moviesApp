import React, {useState} from 'react'
import MediaCard from '../mediaCard'

function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const forwardIndex = (index) => {
    if (index < items.length - 1) {
      setCurrentIndex(index + 1)
    } else if (index === items.length - 1) {
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
      setCurrentIndex(items.length - 1)
    }
  }
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {(items.length > 0) ? items.map((movie, index) => (
          index === currentIndex ?
            <div className="carousel-item active" key={movie.id}>
              <MediaCard media={movie} />
            </div>
            :
            <div className="carousel-item" key={movie.id}>
              <MediaCard media={movie} />
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
  )
}

export default Carousel
