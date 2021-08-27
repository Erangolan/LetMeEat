const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Recipe = require('./Recipe');

const schema = {
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: [Recipe.schema],
};

// eslint-disable-next-line camelcase
const user_schema = new mongoose.Schema(schema);
const User = mongoose.model('User', user_schema);
module.exports = User;
