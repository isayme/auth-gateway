const jwt = require('jsonwebtoken')
const { HeaderAccessToken } = require('app/constants')
const UnauthorizedError = require('app/error/unauthorized')

// get token from header
function getFromHeader (req) {
  const value = req.getHeader(HeaderAccessToken)
  if (value) {
    const parts = value.split(' ')
    if (parts.length !== 2) {
      throw new UnauthorizedError(
        'authorization fromat invalid: Bearer [token]'
      )
    }

    return parts[1]
  }
}

function getFromQuery (req) {
  if (req.query && req.query.access_token) {
    return req.query.access_token
  }
}

module.exports.get = function get (req) {
  let token

  token = getFromQuery(req)
  if (token) {
    return token
  }

  token = getFromHeader(req)
  if (token) {
    return token
  }

  return ''
}

module.exports.verify = function verify (token, secret) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}
