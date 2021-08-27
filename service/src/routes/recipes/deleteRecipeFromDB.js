const {
  User,
} = require('../../models')

module.exports = (async (req, res) => {
  const {
    query: {
      id: recipeId,
    },
    user: {
      id: userId,
    },
  } = req

  try {
    const { recipes } = await User.findById(userId).lean().exec()

    const {
      _id: recIdToDelete,
    } = recipes
      .filter(({ id }) => id === Number(recipeId))
      .reduce(({ _id }) => _id)

    await User.updateOne(
      { _id: userId }, { $pull: { recipes: { _id: recIdToDelete } } },
    )

    return res.json(`${recIdToDelete} deleted successfully`)
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
