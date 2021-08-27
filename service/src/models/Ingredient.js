const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = {
  id: { type: Number, required: true },
  img: { type: String, required: true },
  imgId: { type: String, required: true },
  name: { type: String, required: true },
}

const ingredientSchema = new mongoose.Schema(schema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)
module.exports = Ingredient
