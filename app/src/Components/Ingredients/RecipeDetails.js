import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: 10
  },
  gridList: {
    width: 700,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root1: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root11: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

export default function RecipeDetails(props) {
    const item = props.recipe;
    const theme = useTheme();
    const classes = useStyles();
    const [recipe, setRecipe] = useState({ id: '', title: '', usedIngredients: [], missedIngredients: [], instructions: [] })
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    const handleChangeIndex = (index) => setValue(index); 
    /*const [show, setShow] = useState(false);
    const switchShow = () => setShow(show => !show);*/
    const { onBla } = props;

    const handleBack = () => {
        //switchShow();
        onBla(2);
    };

    useEffect(() => {
        //console.log(item);
        async function fetchData() {
          let resJson = [];
          try {
              resJson = await fetch(`http://localhost:3000/recipes/getInsructionsByID?id=${item.id}`)
              .then(res => res.json())
          } catch(err){
              console.log('instructions not available');
          }
          return setRecipe({...recipe,
              id: item.id,
              image: item.image,
              title: item.title,
              usedIngredients: item.usedIngredients,
              missedIngredients: item.missedIngredients,
              instructions: resJson
          })
      }
        fetchData();
    }, [])


    function oneRecipe() {
      //console.log(recipe.id);
        return (
            <Card className={classes.root1} key={recipe.id}>
                <CardHeader
                    avatar={
                        <Button size="small" onClick={handleBack}>
                            <KeyboardArrowLeft />
                        </Button>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={recipe.title}
                />
                <CardMedia
                    className={classes.media}
                    image={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`}
                    title={recipe.title}
                />
                <CardContent></CardContent>
                <CardActions >
                    <div className={classes.root11}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Missed Ingredients" {...a11yProps(0)} />
                                <Tab label="Used Ingredients" {...a11yProps(1)} />
                                <Tab label="Instructions" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                {recipe.missedIngredients.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                    </li>
                                ))}
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                {recipe.usedIngredients.map((item, i) => (
                                  <li key={i}>
                                        {item}
                                    </li>
                                ))}
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                {recipe.instructions.map((item, i) => (
                                  <li key={i} style={{ listStyleType: 'none' }}>
                                        {item}
                                    </li>
                                ))}
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </CardActions>
            </Card>
        );
    }

    return /*show ? <Recipes results={props.results}/> :*/ oneRecipe();
}