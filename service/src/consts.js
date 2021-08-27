require('dotenv').config()

const packagejson = require('../package.json')

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  PORT,
  API_KEY,
} = process.env

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASS,
  PORT,
  API_KEY,
  SERVICE_NAME: `${packagejson.name}:${packagejson.version}`,
}
