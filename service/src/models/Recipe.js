const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = {
  id: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: Array, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
}

const recipeSchema = new mongoose.Schema(schema)
const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
