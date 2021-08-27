const express = require('express')

const router = express.Router()

const signUp = require('./signUp')
const login = require('./login')

router.post('/signUp', [], signUp)
router.post('/login', [], login)

module.exports = router
