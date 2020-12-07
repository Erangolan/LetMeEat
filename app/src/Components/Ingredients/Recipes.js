import React, { useState, useEffect } from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ListSubheader from '@material-ui/core/ListSubheader';


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
}));



export default function Ingredients(props) {
    const userText = props.userText;
    const token = props.token;
    const classes = useStyles();
    const INITIAL_RESULTS_STATE = [];
    const [ results, setResults ] = useState(INITIAL_RESULTS_STATE);
    /*const [show, setShow] = useState(false);
    const switchShow = () => setShow(show => !show);*/
    const INITIAL_RECIPE_STATE = { id: '', title: '', usedIngredients: [], missedIngredients: [], instructions: [] };
    const [Recipe, setRecipe] = useState(INITIAL_RECIPE_STATE)
    const { onSpecificRecipe, onBck } = props;

    const handleBack = () => {
        //switchShow();
        onBck(4);
    }

    useEffect(() => {
        console.log(userText)
        /*if (props.recipe !== undefined && props.recipe.length > 0)
            return setResults(props.recipe);*/
        async function fetchData() {
            console.log(userText)
            let resJson = [];
            try {
                resJson = await fetch(`http://localhost:3000/recipes/getRecipeByIngredients?ingredients=${userText}`)
                .then(res => res.json())
            } catch(err){
                console.log('there is not match');
            }
            return setResults(resJson);
        }
        fetchData();
    }, [])

    
    const setItem = (item) => {
        setRecipe({...Recipe,
            id: item.id,
            image: item.image,
            title: item.title,
            usedIngredients: item.usedIngredients,
            missedIngredients: item.missedIngredients,
        })
        onSpecificRecipe(item, results);
        //switchShow();
    }

    function addItem(item){
        async function fetchSave(){
            //console.log(item.id)
            try {
                await fetch(`http://localhost:3000/recipes/saverecipe?id=${item.id}`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'token': token
                    },
                })
                .then(res => console.log(res.json()))
                } catch(err){
                    console.log(`fetch: ${err}`);
                }
                alert('uploaded successfully');
        }
        fetchSave();
    }

    function eachRecipe() {
        return (
            <div className={classes.root}>
                <GridList cellHeight={240} spacing={10} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">
                        <Button size="small" onClick={ handleBack }>
                            <KeyboardArrowLeft />
                        </Button>
                    </ListSubheader>
                    </GridListTile>
                    {results.map((item, i) => (
                        <GridListTile key={item.id} index={i}>
                            <img src={item.image} alt={item.title} onClick={() => setItem(item)} />
                            <GridListTileBar
                                title={item.title}
                                actionIcon={
                                    <IconButton aria-label={`info about ${item.title}`} onClick={() => addItem(item)} className={classes.icon}>
                                        <AddIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }

    
    return /*show ? <RecipeDetails recipe={Recipe} results={results} /> :*/ eachRecipe();
}

