const path = require('path')
require('app-module-path').addPath(path.resolve(__dirname, '..'))

const _ = require('lodash')
const express = require('express')
const config = require('config')
const pkg = require('../package')
const debug = require('debug')('auth:gateway')
const tokenUtil = require('app/token')
const { asyncWrap } = require('app/util')
const { HeaderViewerId } = require('app/constants')
const logger = require('app/logger')

const app = express()

app.use(require('app/middleware/logger'))

async function parseAuth (req, res) {
  const token = tokenUtil.get(req)
  if (token) {
    let error

    const secrets = config.jwt.secrets

    res.removeHeader(HeaderViewerId)

    for (let i = 0; i < secrets.length; i++) {
      error = null

      try {
        const decoded = await tokenUtil.verify(token, secrets[i])
        debug(decoded)

        const viewrId = decoded._userId
        res.setHeader(HeaderViewerId, viewrId)
        break
      } catch (err) {
        debug(err.name, err.code, err.message)
        error = err
      }
    }

    if (error) {
      throw error
    }
  }

  debug('set accel to @accel')
  res.setHeader('X-Accel-Redirect', '@accel')
  res.status(101)
  res.end()
}

app.use(asyncWrap(parseAuth))
app.use(require('app/middleware/error-handler'))

const port = process.env.PORT || _.get(config, 'port', 3000)

const server = app.listen(port, () => {
  const address = server.address()
  logger.info(`${pkg.name}:${pkg.version} listening ${address.port} ...`)
})
