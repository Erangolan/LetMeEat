const {
  User,
  Recipe,
} = require('../../models')

module.exports = (async (req, res) => {
  const {
    body,
    user: {
      id: userId,
    },
    query: {
      id: recipeId,
    },
  } = req

  try {
    const {
      ingredients,
      title,
      img,
    } = body

    const { recipes } = await User.findById(userId).lean().exec()

    const exst = recipes.some(({ id }) => id === recipeId)
    if (Number.isNaN(recipeId) || exst) {
      throw new Error('id not found or recipe already exist in DB')
    }

    const newRecipe = new Recipe({
      ingredients,
      id: recipeId,
      title,
      img,
    })

    await User.updateOne(
      { _id: userId },
      { $push: { recipes: newRecipe } },
    )

    return res.json(`recipe: ${recipeId} saved successfully`)
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
