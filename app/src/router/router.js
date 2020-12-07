import React from 'react';
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';
import Header from '../Components/Header';
import Recipes from '../Components/Ingredients/Recipes'
import Form from '../Components/Ingredients/Form'
import Login from '../Components/Login'
import MyRecipes from '../Components/MyRecipes/MyRecipes';
import App from '../Components/App'

const ReactRouter = () => {
    
    return (
        <React.Fragment>
            
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/MyRecipes" component={MyRecipes}/>
                <Route path="/Form" component={Form}/>
                <Route path="/Recipes" component={Recipes}/>
            </Switch>
        </React.Fragment>
    )
}

export default ReactRouter;