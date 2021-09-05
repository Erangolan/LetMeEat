const {
  User,
} = require('../../models')

module.exports = (async (req, res) => {
  const {
    user: { id },
  } = req

  try {
    const { recipes } = await User.findById(id).lean().exec()

    return res.json(recipes)
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
