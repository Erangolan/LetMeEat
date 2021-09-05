const cron = require('node-cron')
const {
  Recipe,
} = require('../../models')

module.exports = (async (req, res) => {
  try {
    cron.schedule('* * * * *', () => {
      console.log('running a task every minute')
    })
    const recipesDB = await Recipe.find({}).lean().limit(20).exec()

    const recipes = recipesDB
      .map((rec) => ({
        id: rec.id,
        title: rec.title,
        image: rec.img,
        ingredients: rec.ingredients,
        instructions: rec.instructions,
      }))

    return res.json({
      recipes,
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
