const {
  Recipe,
} = require('../../models')

module.exports = (async (req, res) => {
  const {
    query: {
      id: recipeId,
    },
  } = req

  try {
    const results = await Recipe.findOneAndDelete(recipeId)

    console.log(results)

    return res.json('deleted successfully')
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
