const {
  User,
  Recipe,
} = require('../../models')

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async getRecipes(req, res, next) {
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
  },

  // eslint-disable-next-line no-unused-vars
  async getRecipeById(req, res, next) {
    const {
      user: {
        id: userId,
      },
      query: {
        id: recipeId,
      },
    } = req

    try {
      const { recipes } = await User.findById(userId).lean().exec()

      const recipe = recipes.find(({ id }) => id === recipeId)
      if (Number.isNaN(recipeId) || !recipe) {
        throw new Error('id not found or recipe doesnt exist')
      }

      return res.json(recipe)
    } catch (e) {
      console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

      return res.status(500).json({
        error: e,
      })
    }
  },

  // eslint-disable-next-line no-unused-vars
  async editRecipe(req, res, next) {
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

      const exst = recipes.find(({ id }) => id === recipeId)
      if (Number.isNaN(recipeId) || !exst) {
        throw new Error('id not found or recipe doesnt exist')
      }

      const updatedRecipes = recipes.map((recipe) => (recipeId.id !== recipeId ? recipe : {
        ingredients,
        title,
        img,
      }))

      await User.updateOne(
        { _id: userId },
        { $set: { recipes: updatedRecipes } },
      )

      return res.send('updated successfully!')
    } catch (e) {
      console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

      return res.status(500).json({
        error: e,
      })
    }
  },

  // eslint-disable-next-line no-unused-vars
  async addRecipe(req, res, next) {
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
        throw new Error('id didnt found or recipe already exist in DB')
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
  },

  // eslint-disable-next-line no-unused-vars
  async removeRecipe(req, res, next) {
    const {
      user: {
        id: userId,
      },
      query: {
        id: recipeId,
      },
    } = req

    try {
      const { recipes } = await User.findById(userId).lean().exec()

      const exst = recipes.find(({ id }) => id === recipeId)
      if (Number.isNaN(recipeId) || !exst) {
        throw new Error('id not found or recipe doesnt exist')
      }

      const filteredRecipes = recipes.filter(({ id }) => id !== recipeId)

      await User.updateOne(
        { _id: userId },
        { $set: { recipes: filteredRecipes } },
      )

      return res.json(`recipe: ${recipeId} deleted successfully`)
    } catch (e) {
      console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

      return res.status(500).json({
        error: e,
      })
    }
  },
}
