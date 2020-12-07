const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const recipesController = require('../controllers/recipes');

router.get('/random', recipesController.getRandomRecipes);
router.get('/getRandomIngredients', auth, recipesController.getRandomIngredients);
router.get('/getRecipeByIngredients', recipesController.getRecipeByIngredients);
router.get('/getDataByRecipeName', recipesController.getIngredientsAndInsructionsByRecipeName);
router.post("/saverecipe", auth, recipesController.SaveRecipeToDB);
//router.get('/getInsructionsByRecipeName', recipesController.getInsructionsByRecipeName);
router.delete('/delete', auth, recipesController.deleteRecipeFromDB);
router.get('/myRecipes', auth, recipesController.getRecipesFromDB);

router.get('/getInsructionsByID', recipesController.getInsructionsByID);

module.exports = router;