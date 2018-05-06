const _ = require('lodash')
const config = require('config')
const jwt = require('jsonwebtoken')

module.exports.signToken = (payload, secret) => {
  if (!secret) {
    secret = _.get(config, 'jwt.secrets.0')
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (err, token) => {
      if (err) {
        return reject(err)
      }

      resolve(token)
    })
  })
}
