const logger = require('./logger')
require('pino-debug')(logger)

const path = require('path')
require('app-module-path').addPath(path.resolve(__dirname, '..'))

const _ = require('lodash')
const express = require('express')
const config = require('config')
const pkg = require('../package')

const app = express()

app.use(require('app/middleware/error-handler'))
app.use(require('app/middleware/logger'))
app.use((req, res, next) => {
  res.setHeader('X-Accel-Redirect', '@accel')
  res.status(101)
  res.end()
})

const port = process.env.PORT || _.get(config, 'port', 3000)

const server = app.listen(port, () => {
  const address = server.address()
  logger.info(`${pkg.name}:${pkg.version} listening ${address.port} ...`)
})
