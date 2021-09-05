const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')
const ctrl = require('./userController')

router
  .get('/recipes', auth, ctrl.getRecipes)
  .get('/recipe/:id', auth, ctrl.getRecipeById)
  .post('/recipe/:id', auth, ctrl.addRecipe)
  .put('/recipe/:id', auth, ctrl.editRecipe)
  .delete('/recipe/:id', auth, ctrl.removeRecipe)

module.exports = router
