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

const {
  exampleDelivery,
} = require('./src/lib')

const recipes = require('./src/routes/recipes/index')
const user = require('./src/routes/user/index')

app.use('/recipes', recipes)
app.use('/user', user)

const bootstrap = async () => {
  console.log('start cron job...')
  await exampleDelivery()
}

bootstrap()

app.listen(PORT, () => console.log('server listening on port: ', PORT))

// const express = require('express')

// const {
//   exampleDelivery,
// } = require('./src/lib')

// const {
//   PORT,
// } = require('./src/consts')

// const bootstrap = async (app) => {
//   console.log('start cron job...')
//   await exampleDelivery()

//   if (!PORT) {
//     console.log('missing port, unable to start express server')
//     return process.exit(1)
//   }

//   return app.listen(PORT, () => {
//     console.log(`server is up and running on ${PORT}`)
//   })
// }

// const app = express()

// bootstrap(app)
