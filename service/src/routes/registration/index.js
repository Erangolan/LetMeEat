const express = require('express')

const router = express.Router()
const ctrl = require('./controller')

router
  .post('/signup', [], ctrl.signup)
  .post('/login', [], ctrl.login)

module.exports = router
