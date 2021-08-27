const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')

const getRandomRecipes = require('./getRandomRecipes')
const getRecipeByIngredients = require('./getRecipeByIngredients')
const getInsructionsByID = require('./getInsructionsByID')
const getRandomIngredientsFromDB = require('./getRandomIngredientsFromDB')
const getRecipesFromDB = require('./getRecipesFromDB')
const deleteRecipeFromDB = require('./deleteRecipeFromDB')
const saveRecipeToDB = require('./saveRecipeToDB')
const getRandomRecipesFromDB = require('./getRandomRecipesFromDB')
const tmpDeleteRec = require('./tmpDeleteRec')

router.get('/random', [], getRandomRecipes)
router.get('/getRecipeByIngredients', [], getRecipeByIngredients)
router.get('/getInsructionsByID', [], getInsructionsByID)
router.get('/randomIngredients', [], getRandomIngredientsFromDB)
router.get('/myRecipes', auth, getRecipesFromDB)
router.delete('/delete', auth, deleteRecipeFromDB)
router.post('/saverecipe', auth, saveRecipeToDB)
router.get('/randomRecipes', getRandomRecipesFromDB)
router.delete('/tmpDelete', tmpDeleteRec)

module.exports = router
