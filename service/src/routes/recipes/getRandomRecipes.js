const axios = require('axios')
const {
  Recipe,
  Ingredient,
} = require('../../models')
const { API_KEY } = require('../../consts')

module.exports = (async (req, res) => {
  try {
    const {
      data,
    } = await axios({
      url: `https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}`,
    })

    const { recipes } = data

    const bulkIng = recipes
      .map(({ extendedIngredients }) => extendedIngredients).flat()
      .map((ingredient) => {
        const {
          image,
          id,
          name,
        } = ingredient

        const write = {
          updateOne: {
            filter: { id },
            update: {
              $set: {
                img: `https://spoonacular.com/cdn/ingredients_250x250/${image}`,
                imageId: id,
                name,
              },
            },
            upsert: true,
          },
        }

        return write
      })

    await Ingredient.bulkWrite(bulkIng)

    const results = [...new Set(recipes
      .map(({ extendedIngredients }) => extendedIngredients
        .map(({ image, id, name }) => ({
          image,
          imageId: id,
          name,
        }))))].flat()

    const bulkArr = recipes.map((recipe) => {
      const {
        id,
        title,
        extendedIngredients,
        instructions,
        image,
      } = recipe

      const ingredients = [...new Set(extendedIngredients
        .flat()
        .map(({ name }) => name))]

      const instaructionsArr = instructions.split('\n').filter((e) => e)

      const write = {
        updateOne: {
          filter: { id },
          update: {
            $set: {
              ingredients,
              instructions: instaructionsArr,
              id,
              title,
              img: image,
            },
          },
          upsert: true,
        },
      }

      return write
    })

    await Recipe.bulkWrite(bulkArr)

    return res.json(results)
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
