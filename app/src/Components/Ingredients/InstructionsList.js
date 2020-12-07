import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
   
}));

export default function InstructionList(props) {
    const { title, img, id } = props;
    const classes = useStyles();
    const [ results, setResults ] = useState([]);

    const handleCook = () => {
        async function fetchData() {
            let resJson = [];
            try {
                resJson = await fetch(`http://localhost:3000/recipes/getDataByRecipeName?recipeName=${title}`)
                .then(res => res.json())
            } catch(err){
                console.log('instructions not available');
            }
            const loadRecipes = resJson.instructions;
            console.log(loadRecipes);
            return setResults(loadRecipes);
        }
        fetchData();
    };

    const handleSave = () => {
        async function fetchData() {
            console.log(id)
            try {
                await fetch(`http://localhost:3000/recipes/saverecipe?id=${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(res => console.log(res.json()))
            } catch(err){
                console.log('err');
            }
            alert('uploaded successfully')
        }
        fetchData();
    };

    function eachRecipe(item, i) {
        console.log(item);
        return item !== undefined ? (
            <div className={classes.card} key={item}>
                <div className="card-title">{item}</div>                
            </div>
        ) : (
            <div className={classes.card} key={i}>instructions not available</div>
        ) 
    }
    
    
    return (
        <div className={classes.container} key={img}>
            <CardActions>
                <IconButton onClick={handleCook} className="container">
                    Cook <PlayCircleOutlineIcon/>
                </IconButton>
                <IconButton onClick={handleSave} aria-label="add to favorites">
                    <FavoriteIcon /> Save
                </IconButton>
            </CardActions>
            { results.map(eachRecipe) }
        </div>
    );
}