/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ListSubheader from '@material-ui/core/ListSubheader';
import { selectAllRecipes, fetchMyRecipes, deleteRecipe } from './userSlice'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles((theme) => ({
  root1: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 240,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export const MyRecipes = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const recipes = useSelector(selectAllRecipes)

  const recipesStatus = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)

  useEffect(() => {
    if (recipesStatus === 'idle') {
      dispatch(fetchMyRecipes())
    }
  }, [recipesStatus, dispatch])

  const clickHandle = (id) => {
    dispatch(deleteRecipe(id))
  }

  let content
  if (recipesStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (recipesStatus === 'succeeded') {
    content = <div className={classes.root1}>
      <ImageList cols={1} className={classes.gridList}>
        <ImageListItem key="Subheader" cols={1} style={{ height: 'auto' }}>
          <ListSubheader component="div">
                      My Recipes
          </ListSubheader>
        </ ImageListItem>
        {recipes.map((item, i) => (
          <Card className={classes.root} key={i} >
            <CardMedia
              className={classes.cover}
              image={item.img}
              title={item.title}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                            require only {item.ingredients.length} ingredients.
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                            require only {item.instructions.length} instructions.
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous" onClick={() => clickHandle(item.id)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
                <IconButton aria-label="play/pause">
                  <RestaurantRoundedIcon />
                </IconButton>
                <IconButton aria-label="next">
                  <EditRoundedIcon />
                </IconButton>
              </div>
            </div>
          </Card>
        ))}
      </ImageList>
    </div>
  } else if (recipesStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>recipes</h2>
      {content}
    </section>
  )
}
