const formatDate = require('./format-date')
// const {
//   CONSENTS_UPDATES,
// } = require('../consts')

module.exports = async (consents) => {
  try {
    const twoWeeksAway = new Date(Date.now() + 10)

    console.log('get consents that about to expire')

    const context = []
    consents.forEach((consent) => {
      if (formatDate(consent.validUntil) === formatDate(twoWeeksAway)) {
        const consentToUpdate = consent
        consentToUpdate.webhookCode = 'PENDING_EXPIRATION'
        context.push(consentToUpdate)
      }
    })

    // await mq.publish(CONSENTS_UPDATES, context)
    console.log('alert consents function is finished')
  } catch (e) {
    console.log({ stack: e.stack }, 'error with alert func', { message: e.toString() })
  }
}
