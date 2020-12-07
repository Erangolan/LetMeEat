import GridList from '@material-ui/core/GridList';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';



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

export default function MyRecipes(props) {
    const token = props.value;
    const classes = useStyles();
    //const theme = useTheme();
    const [recipes, setRecipes] = useState([]);
    //const [index, setIndex] = useState('');
    const { onMyRecipes } = props;

    const handleBack = () => {
        onMyRecipes();
    }

    useEffect(() => {
        async function fetchData(){
            let data = [];
            try {
                data = await fetch(`http://localhost:3000/recipes/myRecipes`, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'token': token
                    },
                })
                .then(response => response.json());
            } catch(err) {
                console.log(`fetch: ${err}`);
            }
            const loadRecipes = data.map(item => ({
                id: item.id,
                title: item.title,
                img: item.img, 
                ingredients: item.ingredients, 
                instructions: item.instructions
            }))
            return setRecipes(loadRecipes);
        }
        fetchData();
    },[]);   
            
    const deleteRecipe = (id) => {
        async function fetchData(){
            try {
                await fetch(`http://localhost:3000/recipes/delete?id=${id}`, {
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                        'token': token
                    },
                })
                .then(response => response.json());
            } catch(err){
                console.log(`fetch: ${err}`);
            }
            alert('deleted successfully')
        }
        fetchData();
    };

    
    function eachRecipe(item, i) {
        return (
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
                        <IconButton aria-label="previous" onClick={() => deleteRecipe(item.id)}>
                            <DeleteOutlineRoundedIcon /*onClick={() => deleteRecipe(item.id)}*/ />
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
        );
    }


    return (
        <div className={classes.root1}>
            <GridList cols={1} className={classes.gridList}>
                <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                    <ListSubheader component="div">
                        <Button size="small" onClick={ handleBack }>
                            <KeyboardArrowLeft />
                        </Button>
                        My Recipes
                    </ListSubheader>
                </GridListTile>
                { recipes.map(eachRecipe) }
            </GridList>
        </div>
    );
}