const axios = require('axios')
// const {
//   Recipe,
//   User,
// } = require('../../models');

const { API_KEY } = require('../../consts')

module.exports = (async (req, res) => {
  const {
    query: { ingredients },
  } = req

  try {
    const {
      data: recipeData,
    } = await axios({
      url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=100&apiKey=${API_KEY}`,
    })

    const results = recipeData
      .reduce((acc, recipe) => {
        const exist = acc.find(({ id }) => id === recipe.id)
        return exist ? acc : [...acc, recipe]
      }, [])
      .map((recipe) => {
        const {
          id,
          title,
          image,
        } = recipe
        const usedIngredients = recipe.usedIngredients.map(({ name }) => name)
        const missedIngredients = recipe.missedIngredients.map(({ name }) => name)

        return {
          id,
          title,
          image,
          usedIngredients,
          missedIngredients,
        }
      })

    console.log('results: ', results)

    return res.json(results)
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
