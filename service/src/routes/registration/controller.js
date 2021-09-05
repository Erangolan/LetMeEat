const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const {
  User,
} = require('../../models')

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async signup(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const {
      username = null, email = null, password = null, recipes = [],
    } = req.body
    try {
      const tmp = await User.findOne({ email })
      if (tmp) return res.status(400).json({ msg: 'User Already Exists' })

      const user = new User({
        username, email, password, recipes,
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const token = jwt.sign({ user: { id: user.id } },
        'randomString')

      return res.json({
        token,
      })
    } catch (e) {
      console.log({ stack: e.stack }, 'error with promotion route', { message: e.toString() })

      return res.status(500).json({
        error: e,
      })
    }
  },

  // eslint-disable-next-line no-unused-vars
  async login(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email = null, password = null } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: 'User Not Exist' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ message: 'Incorrect Password !' })

      const token = jwt.sign({ user: { id: user.id } },
        'randomString')

      return res.json({
        token,
      })
    } catch (e) {
      console.log({ stack: e.stack }, 'error with promotion route', { message: e.toString() })

      return res.status(500).json({
        error: e,
      })
    }
  },
}
