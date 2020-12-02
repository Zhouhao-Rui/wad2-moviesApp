import React, { useEffect, useState } from 'react'
import { getCreator } from '../api/tmdb-api'
import { makeStyles } from '@material-ui/core/styles';
import SearchHeader from '../components/tv/searchHeader'
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 700,
  },
});


function PeoplePage(props) {
  const { id } = props.match.params
  const [creator, setCreator] = useState({})
  const classes = useStyles();
  useEffect(() => {
    getCreator(id).then(res => {
      setCreator(res)
    })
  }, [id])
  return (
    <>
      <SearchHeader />
      {Object.keys(creator).length !== 0 && <div className="content d-flex flex-column justify-content-center align-items-center flex-wrap">
        <Typography className="mt-3" variant="h4" color="textPrimary">
          {creator.name}
        </Typography>
        <div className="d-flex flex-row justify-content-center">
          <img src={creator.profile_path
            ? `https://image.tmdb.org/t/p/w300/${creator.profile_path}`
            : "./film-poster-placeholder.png"
          } alt="pic" />
          <Card className={classes.root} variant="outlined">
            <CardContent className="ml-5">
              <Typography variant="h5" color="textSecondary" gutterBottom>
                Name:  {creator.name}
              </Typography>
              <Typography className="mt-2">
                Department:  {creator.known_for_department}
              </Typography>
              <Typography className="mt-2">
                Gender:  {creator.gender === 1 ? 'male' : 'female'}
              </Typography>
              <Typography variant="body1" component="p" className="mt-2">
                Popularity:  {creator.popularity}
              </Typography>
              <Typography className="mt-5">
                All Shows:
              </Typography>
              <div className="d-flex flex-row justify-content-between align-items-center">
                {creator.known_for.map(media => (
                  <div>
                    <Link to={`/tv/${media.id}`}><img data-cy="people-poster" src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`} alt="" style={{ width: 150 }} /></Link>
                    <p>{media.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      }

    </>
  )
}

export default PeoplePage
