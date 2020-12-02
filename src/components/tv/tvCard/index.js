import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  media: {
    height: 260,
  },
  overview: {
    height: 100,
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

function TVCard({ tv }) {
  const classes = useStyles();

  return (
    <div className="col-sm-3 mt-2">
      <Card>
        <CardActionArea>
          <Link to={`/tv/${tv.id}`} data-cy="detail-link">
            <CardMedia
              className={classes.media}
              image={tv.poster_path ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : "./film-poster-placeholder.png"}
              title="Contemplative Reptile"
            />
          </Link>
          <CardContent data-cy="card-content">
            <Typography gutterBottom variant="h5" component="h2" data-cy="tv-name">
              {tv.name}
            </Typography>
            <Typography className={classes.overview} variant="body2" color="textSecondary" component="p">
              {tv.overview}
            </Typography>
            <Divider />
            <Typography variant="body2" color="textPrimary" component="p" data-cy="first-air-date">
              date: {tv.first_air_date}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p" data-cy="vote-average">
              rate: {tv.vote_average}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p" data-cy="vote-count">
              vote count: {tv.vote_count}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" data-cy="rate-button">
            <Link to={{
              pathname: `/tvs/rate/${tv.id}`,
              state: {
                tv
              }
            }}>Rate Now</Link>
          </Button>
          <Button size="small" color="primary" data-cy="list-button">
            <Link to={`/tvs/list/${tv.id}`}>Add to List</Link>
        </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TVCard
