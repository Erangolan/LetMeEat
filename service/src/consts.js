require('dotenv').config()

const packagejson = require('../package.json')

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  PORT,
  API_KEY,
  CRON_TIMING = '0 0 */12 * * *',
} = process.env

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASS,
  PORT,
  API_KEY,
  CRON_TIMING,
  SERVICE_NAME: `${packagejson.name}:${packagejson.version}`,
}
