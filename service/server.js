const express = require('express')

const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
app.set('port', port)
const cors = require('cors')

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

// eslint-disable-next-line no-unused-vars
const { set } = require('mongoose')
const recipes = require('./src/routes/recipes/index')
const user = require('./src/routes/user/index')

app.use('/recipes', recipes)
app.use('/user', user)

app.listen(port, () => console.log('server listening on port: ', port))
