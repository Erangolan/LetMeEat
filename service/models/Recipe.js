const mongoose = require('mongoose');

const schema = {
    id: { type: Number, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: Array, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
}

const recipe_schema = new mongoose.Schema(schema);
const Recipe = mongoose.model('Recipe', recipe_schema);
module.exports = Recipe;