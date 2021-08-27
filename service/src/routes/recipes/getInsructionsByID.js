const axios = require('axios')
const { API_KEY } = require('../../consts')

module.exports = (async (req, res) => {
  const {
    query: { id },
  } = req

  try {
    const {
      data,
    } = await axios({
      url: `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`,
    })

    const { steps } = data[0]
    console.log(data)
    const instructions = steps.map((item) => {
      const {
        number,
        step,
      } = item

      return `${number}: ${step}`
    })

    console.log(instructions)

    return res.json(instructions)
  } catch (e) {
    console.log({ stack: e.stack }, 'error with this route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
