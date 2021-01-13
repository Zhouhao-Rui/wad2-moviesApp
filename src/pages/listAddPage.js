import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { getTVDetails, getLists, addMovieToList } from '../api/tmdb-api'

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function ListAddPage(props) {
  const id = props.match.params.id
  console.log(id)
  const [tv, setTV] = useState({})
  const [lists, setLists] = useState([])
  const [msg, setMsg] = React.useState("")
  const [msgType, setMsgType] = React.useState("")
  const [chosenList, setChosenList] = useState(null)
  const classes = useStyles();
  useEffect(() => {
    getTVDetails(id).then(res => {
      setTV(res)
    })
  }, [id])
  useEffect(() => {
    getLists().then(res => {
      console.log(res)
      setLists(res)
      setChosenList(res[0].id)
    })
  }, [])

  const handleChange = (e) => {
    setChosenList(e.target.value)
  }

  const handleClick = (chosen_id, media_id) => {
    addMovieToList(chosen_id, media_id).then(res => {
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
      {chosenList &&
        <FormControl variant="filled" className="mt-3">
          <InputLabel id="demo-simple-select-filled-label">All list</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={chosenList}
            onChange={e => handleChange(e)}
          >
            {lists && lists.map(list => (
              <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      }

      <Button
        variant="contained"
        color="primary"
        className="mt-3"
        endIcon={<Icon>send</Icon>}
        onClick={e => handleClick(chosenList, id)}
      >
        Send
      </Button>

      {msg && <Alert className="mt-5" severity={msgType}>{msg}</Alert>}
    </div>
  )
}

export default ListAddPage
