import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Recipes from './Recipes';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    root1: {
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
    image: {
        image: {
            backgroundColor: '#cccccc',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }
    }
}));

export default function Form(props) {
    const token = props.value;
    const [ results, setResults ] = useState([]);
    const classes = useStyles();
    const { handleSubmit } = useForm();
    const [userText, setUserText] = useState([]);
    const [show, setShow] = useState(true);
    const switchShow = () => setShow(show => !show);
    const updateUserText = event => setUserText(event.target.value);
    const { onSubmitTxt, onPaging } = props;

    const onSubmit = () => {
        switchShow();
        onSubmitTxt(results, userText);
        onPaging(2);
    }

    useEffect(() => {
        console.log(props.results)
        if(props.results.length > 0)
            return setResults(props.results);
        async function fetchData(){
            let data = [];
            try {
                data = await fetch('http://localhost:3000/recipes/random')
                .then(res => res.json())
            } catch(err){
                console.log(`fetch err ${err}`);
            }
            const loadResults = data.map(item => ({
                image: `https://spoonacular.com/cdn/ingredients_250x250/${item.image}`,
                imageId: item.imageId,
                name: item.name
            }))
            console.log(loadResults);
            return setResults(loadResults);
        }
        fetchData();
    },[]);
    

    function random(item, i) {
        return (
            <GridListTile /*key={item.id}*/key={i} index={i} onClick={() => setUserText(prevState => ([...prevState, item.name ]))} >
                <img src={item.image} alt={item.title} className={classes.image}/>
                    <GridListTileBar title={item.name} />
            </GridListTile>
        );
    }


    function searchBar() {
        return (
            <div >
                <Paper component="form" className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                    <InputBase
                        className={classes.input}
                        placeholder="insert ingredients"
                        value={userText}
                        onChange={updateUserText}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div className={classes.root1}>
                    <GridList cols={4} className={classes.gridList}>
                        { results.map(random) }
                    </GridList>
                </div>
            </div>
        );
    }

    
    return show ? searchBar() : <Recipes userText={userText} token={token} randomIngredients={results}/> 
}