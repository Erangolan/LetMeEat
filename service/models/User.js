const mongoose = require('mongoose');
const Recipe = require('./Recipe');

const schema = {
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    recipes: [ Recipe.schema ]
}

const user_schema = new mongoose.Schema(schema);
const User = mongoose.model('User', user_schema);
module.exports = User;