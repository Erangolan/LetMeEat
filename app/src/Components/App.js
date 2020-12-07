import React, { useState } from 'react';
import Header from './Header';
import Form from '../Components/Ingredients/Form'
import MyRecipes from './MyRecipes/MyRecipes';
import Recipes from './Ingredients/Recipes';
import RecipeDetails from './Ingredients/RecipeDetails'


export default function App(props){
    const token = props.value;
    const [txt, setTxt] = useState([]);
    const [ randomIngredients, setRandomIngredients ] = useState([]);
    const [rec, setRec] = useState({ id: '', title: '', usedIngredients: [], missedIngredients: [], instructions: [] });
    const [recipeResults, setRecipeResults] = useState([]);
    
    const [ count, setCount] = useState(4);
    const [ prev, setPrev ] = useState();

    const bla = (pageNum) => {
        console.log(pageNum)
        setPrev(count);
        setCount(pageNum);
    }

    const saveRandomIngredients = (ingredientsList, userTxt) => {
        setRandomIngredients(ingredientsList);
        setTxt(userTxt);
        setPrev(count);
        setCount(2);
    }

    const specificRecipe = (item, results) => {
        setRec({...rec,
            id: item.id,
            image: item.image,
            title: item.title,
            usedIngredients: item.usedIngredients,
            missedIngredients: item.missedIngredients,
        })
        setRecipeResults(results);
        setPrev(count);
        setCount(3);
    }

    const setter = () => {
        setCount(prev);
        setPrev(1);
    }
    

    function SwitchCase() {
        switch(count) {
            case 1:
                return <MyRecipes value={token} onMyRecipes={setter} />
            case 2:
                return <Recipes recipe={recipeResults} userText={txt} value={token} onBck={bla} onSpecificRecipe={specificRecipe} />
            case 3:
                return <RecipeDetails value={token} recipe={rec} onBla={bla} />;
            case 4:
                return <Form results={randomIngredients} userText={txt} value={token} onPaging={bla} onSubmitTxt={saveRandomIngredients} />;
        }
    }


    return (
        <div>
            <Header value={token} onTouch={bla} />
            <SwitchCase value={count} />
        </div>
    )
}


/*return (
        <div>
            <Header value={token} onChange={ switchShow } onBla={bla}/>
            {show ? <MyRecipes value={token}/> : <Form value={token}/>}
        </div>
    )*/