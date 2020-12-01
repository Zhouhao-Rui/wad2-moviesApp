import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { getTVDetails } from '../api/tmdb-api'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
/**
 * rating
 */
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

/**
 * button
 */
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { postTVRating } from '../api/tmdb-api'

/**
 * snackbar
 */
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function RatePage(props) {
  const id = props.match.params.id
  const [tv, setTV] = useState({})
  const [value, setValue] = React.useState(2);
  const [msg, setMsg] = React.useState("")
  const [msgType, setMsgType] = React.useState("")
  const classes = useStyles();

  useEffect(() => {
    getTVDetails(id).then(res => {
      setTV(res)
    })
  }, [id])

  const handleClick = (value) => {
    postTVRating(id, value).then(res => {
      setMsg(res.status_message)
      if (res.success) {
        setMsgType("success")
        setTimeout(() => {
          props.history.go(-1)
        }, 2000)
      } else {
        setMsgType("error")
      }
    })

  }
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h2>Rating Page</h2>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              M
          </Avatar>
          }
          title={tv.name}
          subheader={tv.first_air_date}
        />
        <CardMedia
          className={classes.media}
          image={tv.poster_path ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : "./film-poster-placeholder.png"}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {tv.overview}
          </Typography>
        </CardContent>
      </Card>

      <Box className="mt-3 text-center" component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={e => handleClick(value)}
      >
        Send
      </Button>

      {msg && <Alert className="mt-5" severity={msgType}>{msg}</Alert>}
    </div>
  )
}

export default withRouter(RatePage)
