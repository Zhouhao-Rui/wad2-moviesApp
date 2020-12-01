import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SearchHeader from '../components/tv/searchHeader'
import { getTVDetails, getSimilarTVs, getTVReviews } from '../api/tmdb-api'
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import TVCard from '../components/tv/tvCard';
import { excerpt } from '../util'

const useStyles = makeStyles({
  root: {
    minWidth: 700,
  },
});

function DetailTVPage(props) {
  const classes = useStyles();
  const { id } = props.match.params
  const [tv, setTV] = useState({})
  const [similarTVs, setSimilarTVs] = useState([])
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    getTVDetails(id).then(res => {
      setTV(res)
    })
    getSimilarTVs(id).then(res => {
      setSimilarTVs(res)
    })
    getTVReviews(id).then(res => {
      setReviews(res)
    })
  }, [id])
  console.log(similarTVs)
  return (
    <>
      <SearchHeader />
      {Object.keys(tv).length &&
        <div className="content d-flex flex-column justify-content-center align-items-center flex-wrap">
          <Typography className="mt-3" variant="h4" color="textPrimary">
            {tv.name}
          </Typography>
          <div className="d-flex flex-row justify-content-center">
            <img src={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`} alt="pic" />
            <Card className={classes.root} variant="outlined">
              <CardContent className="ml-5">
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  Name:  {tv.name}
                </Typography>
                <Typography className="mt-2">
                  origin Counrty:  {tv.origin_country}
                </Typography>
                <Typography className="mt-2">
                  production Country: {tv.production_countries.map(country => {
                  return country.name
                })}
                </Typography>
                <Typography variant="body1" component="p" className="mt-2">
                  overeview:  {tv.overview}
                </Typography>
                <Typography className="mt-2">
                  first Air date:  {tv.first_air_date}
                </Typography>
                <Typography className="mt-2">
                  Created By: {tv.created_by.map(people => (
                  <Link key={people.id} className="ml-2" to={`/people/${people.credit_id}`}>{people.name}</Link>
                ))}
                </Typography>
                <Typography className="mt-5">
                  See the film here: <a href={tv.homepage}><img src={`https://image.tmdb.org/t/p/w200/${tv.backdrop_path}`} alt="" /></a>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      }
      {similarTVs.length > 0 &&
        <div className="mt-5">
          <div><h5>Similar TV shows</h5></div>
          <div className="row">
            {similarTVs.slice(0, 8).map(tv => (
              <TVCard tv={tv} />
            ))}
          </div>
        </div>
      }

      {reviews.length > 0 &&
        <div className="mt-5">
          <div><h5>Reviews</h5></div>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Author</th>
                <th scope="col">Excerpt</th>
                <th scope="col">More</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => {
                return (
                  <tr key={review.id}>
                    <td>{review.author}</td>
                    <td>{excerpt(review.content)}</td>
                    <td>
                      {" "}
                      <Link
                        to={{
                          pathname: `/reviews/${review.id}`,
                          state: {
                            review: review,
                            movie: tv
                          }
                        }}
                      >
                        Full Review
                   </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      }

    </>
  )
}

export default DetailTVPage
