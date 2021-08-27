const {
  Ingredient,
} = require('../../models')

module.exports = (async (req, res) => {
  try {
    const ingredientsDB = await Ingredient.find({}).lean().exec()

    const ingredients = ingredientsDB.map(({ _id, img, name }) => ({
      id: _id,
      image: img,
      title: name,
    }))

    console.log(ingredients)

    return res.json({
      ingredients,
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
