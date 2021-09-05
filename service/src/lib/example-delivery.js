const cron = require('node-cron')

const { eachLimit } = require('async')

const {
  Recipe,
} = require('../models/index')
const consentAlert = require('./example-alert')

const {
  CRON_TIMING,
} = require('../consts')

module.exports = async (mq) => {
  try {
    cron.schedule(CRON_TIMING, async () => {
      console.log('starting cron job for fetching valid consents')

      const consents = await Recipe.find({}).lean().exec()

      consents.map((element) => console.log('element: ', JSON.stringify(element, null, 4)))

      await eachLimit(consents, 4, async (consent) => {
        const eventInfo = {
          ...consent,
        }

        console.log('blalalalala', eventInfo)
      })

      await consentAlert(mq, consents)

      console.log('get accounts function is finished')

      console.log('get transactions function is finished')
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with consent-delivery', { message: e.toString() })
  }
}
