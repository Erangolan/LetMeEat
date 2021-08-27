const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')

const {
  User,
} = require('../../models/index')

module.exports = (async (req, res) => {
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
})
