import React from 'react'
/** Material UI */
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

import SecondaryListItem from './SecondaryListItem'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 120,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));
function SideBar() {
  /** Material UI */
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [movieOpen, setMovieOpen] = React.useState(false)
  const [TVOpen, setTVOpen] = React.useState(false)
  const [collectionOpen, setCollectionOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Input />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movie" onClick={() => setMovieOpen(!movieOpen)} secondary={movieOpen ? SecondaryListItem({
              items: ['sub1', 'sub2', 'sub3']
            }) : []} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="TV" onClick={() => setTVOpen(!TVOpen)} secondary={TVOpen ? SecondaryListItem({
              items: ['sub1', 'sub2', 'sub3']
            }) : []} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Collection list" onClick={() => setCollectionOpen(!collectionOpen)} secondary={collectionOpen ? SecondaryListItem({
              items: ['sub1', 'sub2', 'sub3']
            }) : []} />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default SideBar
