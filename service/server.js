const express = require('express')

const app = express()
require('dotenv').config()
const cors = require('cors')
const {
  PORT,
} = require('./src/consts')

app.set('port', PORT)

app.use(cors())

app.use('/', express.static('./public'))
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const recipes = require('./src/routes/recipes/index')
const user = require('./src/routes/user/index')
const registration = require('./src/routes/registration/index')

app.use('/recipes', recipes)
app.use('/user', user)
app.use('/registration', registration)

app.listen(PORT, () => console.log('server listening on port: ', PORT))
