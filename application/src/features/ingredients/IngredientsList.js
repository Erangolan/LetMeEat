/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { selectAllIngredients, formUpdated } from './IngredientsSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 750,
    height: 675,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export const IngredientsList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ingredients = useSelector(selectAllIngredients)

  const ingredientsStatus = useSelector((state) => state.ingredients.status)
  const error = useSelector((state) => state.ingredients.error)

  const clickHandle = (title) => {
    dispatch(formUpdated(title))
  }

  let content
  if (ingredientsStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (ingredientsStatus === 'succeeded') {
    content = <div className={classes.root}>
      <ImageList rowHeight={180} cols={3} style={{ height: 'auto' }} className={classes.imageList}>
        {ingredients.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.image} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon} onClick={() => clickHandle(item.title)}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  } else if (ingredientsStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>random ingredienst</h2>
      {content}
    </section>
  )
}
