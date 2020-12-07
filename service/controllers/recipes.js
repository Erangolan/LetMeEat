const Recipe = require('../models/Recipe');
const User = require('../models/User');
const axios = require('axios');
const { API_KEY } = require('../Constants');
const { exists } = require('../models/Recipe');

module.exports = {

    async getRandomIngredientsFromDB(req, res, next) {
        const result = await Item.find({});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },



    async getRandomRecipes(req, res, next) {  
        await axios({
            url: `https://api.spoonacular.com/recipes/random?number=4&apiKey=${API_KEY}`,
        })
        .then(response => {
            const info = response.data.recipes;
            const results = [];
            info.forEach(item => {
                let temp = item.extendedIngredients;
                temp.forEach(elem => {
                    let obj = {image: '', imageId: '', name: ''};
                    obj.image = elem.image;
                    obj.imageId = elem.id;
                    obj.name = elem.name;
                    const found = results.some(el => el.imageId === obj.imageId);
                    found ? {...results} : results.push(obj);
                })
            })
            console.log(results)
            res.send(results);
        })
        .catch(error => {
            console.log(error);
            res.send('not found');
        });
    },

    async getRandomIngredients(req, res, next) {
        
        await axios({
            url: `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`,
        })
        .then(response => {
            const info = response.data.recipes[0].extendedIngredients;
            const results = [];
            info.forEach(item => {
                let obj = {id: '', image: '', name: ''};
                obj.id = item.id;
                obj.image = item.image;
                obj.name = item.name;
                const found = results.some(el => el.id === obj.id);
                found ? {...results} : results.push(obj);
            })

            if (results) {
                console.log(results)
                res.send(results);
            } else {
                res.status(404).send('not found');
            }
        })
        .catch(error => {
            console.log(error);
            res.send('not found');
        });
    },

    async getRecipeByIngredients(req, res, next) {
        const ingredients = await req.query.ingredients;
        axios({
            url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`,
        })
        .then(response => {
            const recipeData = response.data;
            const results = [];
            recipeData.forEach(item => {
                let obj = {id: '', title: '', image: '', usedIngredients: [], missedIngredients: []};
                obj.id = item.id;
                obj.title = item.title;
                obj.image = item.image;
                let tmp = item.usedIngredients;
                tmp.forEach(elem => {
                    obj.usedIngredients.push(elem.name);
                })
                tmp = item.missedIngredients;
                tmp.forEach(elem => {
                    obj.missedIngredients.push(elem.name);
                })
                results.push(obj);
            })
            
            if (results) {
                console.log(results)
                res.send(results);
            } else {
                res.status(404).send('not found');
            }
        })
        .catch(error => {
            console.log(error);
            res.send('Recipe by Ingridients ERR!!');
        });
    },




    async getInsructionsByID(req, res, next) {
        const id = await req.query.id;
        axios({
            url: `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`,
        })
        .then(response => {
            const info = response.data[0].steps;
            const instructionsInfo = [];
            const ingredientsInfo = [];
            const ingredientsImages = [];
            let results = {name: '', image: '', instructions: '', ingredients: '', ingredientsImages: ''};

            info.forEach(item => {
                instructionsInfo.push(`${item.number}: ${item.step}`)
                let tmp = []
                item.ingredients.length !== 0 ? tmp.push(item.ingredients) : {...tmp}
                tmp.forEach(elem => {
                    elem.forEach(data => ingredientsInfo.push(data.name))
                    elem.forEach(data => ingredientsImages.push(`https://spoonacular.com/cdn/ingredients_250x250/${data.image}`))
                })
            })
            
            results.instructions = instructionsInfo;
            results.ingredients = ingredientsInfo;
            results.ingredientsImages = ingredientsImages;
            //results.push(global);
            
            if (results) {
                console.log(results)
                res.send(results.instructions);
            } else {
                res.status(404).send('not found');
            }
        })
        .catch(error => {
            console.log(error);
            res.send('Recipe by Ingridients ERR!!');
        });
    },




    async getIngredientsAndInsructionsByRecipeName(req, res, next) {
        const recipeName = await req.query.recipeName;
        let global = '';
        axios({
            url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&query=${recipeName}`,  //search by recipe name, return recipe's id 
        })
        .then(response => {
            const recipesList = response.data.results;
            global = response.data.results[0].image;
            const id = [];
            //recipesList.forEach(rec => rec.title === recipeName ? id.push(rec.id) : {...id});
            let returnVal = recipesList[0].id;
            return (axios.get(`https://api.spoonacular.com/recipes/${parseInt(returnVal)}/analyzedInstructions?apiKey=${API_KEY}`))    //search instruction by id
        })
        .then(response => {
            const info = response.data[0].steps;
            const instructionsInfo = [];
            const ingredientsInfo = [];
            const ingredientsImages = [];
            let results = {name: recipeName, image: '', instructions: '', ingredients: '', ingredientsImages: ''};

            info.forEach(item => {
                instructionsInfo.push(`${item.number}: ${item.step}`)
                let tmp = []
                item.ingredients.length !== 0 ? tmp.push(item.ingredients) : {...tmp}
                tmp.forEach(elem => {
                    elem.forEach(data => ingredientsInfo.push(data.name))
                    elem.forEach(data => ingredientsImages.push(`https://spoonacular.com/cdn/ingredients_250x250/${data.image}`))
                })
            })
            results.image = global;
            results.instructions = instructionsInfo;
            results.ingredients = ingredientsInfo;
            results.ingredientsImages = ingredientsImages;
            //results.push(global);
            
            if (results) {
                console.log(results)
                res.send(results);
            } else {
                res.status(404).send('not found');
            }
        })
        .catch(error => {
            console.log(error);
            res.send('not found');
        });
    },

    async SaveRecipeToDB(req, res, next) {
        const id = req.query.id;
        
        const user = await User.findById(req.user.id);
        let exst = false;
        user.recipes.forEach(item => item.id === Number(id) ? exst = true : {exst})
        if (Number.isNaN(id) || exst) {
            res.status(404).send('id not found or recipe already exist in DB');
            return;
        }

        await axios ({
            url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
        })
        .then(response => {
            const info = response.data.analyzedInstructions;
            //console.log(info);
            const instructions = [], ingredients = [], results = [], results2 = [], tmp = [], tmp2 = [], tmp3 = [];
            const img = response.data.image;
            const title = response.data.title;
            
            info.forEach(item => {
                tmp.push(item)
            })

            tmp.forEach(item => {
                tmp2.push(item.steps)
            })

            tmp2[0].forEach(item => {
                instructions.push(`${item.number}: ${item.step}`)
                tmp3.push(item.ingredients)
            })

            tmp3[0].forEach(item => {
                ingredients.push(item.name)
            })

            results2.push(instructions)
            results.push(ingredients)
            
            const recipe = new Recipe({ id, title, img, ingredients, instructions });
            user.recipes.push(recipe);
            const result = user.save();

            if (result) {
                res.json('uploaded successfully!');
                console.log('uploaded successfully!');
            } else {
                res.status(404).send('not found or already exist');
            }
        })
        .catch(error => {
            console.log(error);
            res.send('recipe');
        });
    },

    async getRecipesFromDB(req, res, next){
        const id = req.user.id;
        const result = await User.findById(id);
        
        if (result){
            res.json(result.recipes);
            console.log(result.recipes);
        } else {
            res.status(404).send('id not found');
        }
    },

    async deleteRecipeFromDB(req, res, next) {
        const id = req.query.id;
        const user = await User.findById(req.user.id);
        if (Number.isNaN(id) || !user) {
            res.status(404).send('id not found');
            return;
        }

        const recs = user.recipes.filter(item => item.id === Number(id));
        user.recipes.id(recs[0]._id).remove();
        const result = user.save();
        
        if (result) {
            res.send("deleted successfully");
            console.log(`${id} deleted successfully`);
        } else {
            res.status(404).send('id not found');
        }
    },






    /*async getInsructionsByRecipeName(req, res, next) {
        const recipeName = await req.query.recipeName;
        let global = {};
        global.name = recipeName;
        axios({
            url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&query=${recipeName}`,  //search by recipe name, return recipe's id 
        })
        .then(response => {
            const recipesList = response.data.results;
            let id = 0;
            let tmp1 = recipeName.toLowerCase();
            let tmp2 = recipesList[0].title.toLowerCase();
            tmp2.includes(tmp1) ? id = recipesList[0].id : {...id};
            
            global.image = `https://spoonacular.com/recipeImages/${id}-90x90.jpg`
            return (axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`))    //search instruction by id
        })
        .then(response => {
            const info = response.data[0].steps;
            const instructionsInfo = [];
            const ingredientsInfo = [];
            const results = [];

            info.forEach(item => {
                instructionsInfo.push(`${item.number}: ${item.step}`)
                let tmp = []
                item.ingredients.length !== 0 ? tmp.push(item.ingredients) : {...tmp}
                tmp.forEach(elem => {
                    elem.forEach(data => ingredientsInfo.push(data.name))
                })
            })
            results.push(instructionsInfo);
            results.push(ingredientsInfo);
            results.push(global);
            if(results) {
                console.log(results);
                res.send(instructionsInfo);
            }
        })
        .catch(error => {
            console.log(error);
            res.send('not found');
        });
    },*/



    /*async getAllItems(req, res, next) {
        const result = await Item.find({});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
    async getItem(req, res, next) {
        const { id = null } = req.params;
        const result = await Item.findOne({ id });
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('id not found');
        }
    },
    async editItem(req, res, next) {
        const { id = null } = req.params;
        const { itemName = null, FirstPublished = null, itemCategory = null, reporter = null } = req.body;
        const result = await Item.updateOne({ id }, { itemName, itemCategory, FirstPublished, reporter });
        if (result) {
            res.json(`item ${id} udated successfully!`);
            console.log(`item ${id} udated successfully!`);
        } else {
            res.status(404).send('not found');
        }
    },
    async addItem(req, res, next) {
        const { id = null, itemName = null, firstPublished = null, itemCategory = null, reporter = null } = req.body;
        const item = new Item({ id, itemName, firstPublished, itemCategory, reporter });
        const result = await item.save();
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
    async removeItem(req, res, next){
        const { id = null } = req.params;
        const result = await Item.deleteOne({id});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },*/
};