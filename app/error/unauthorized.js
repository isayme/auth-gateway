class UnauthorizedError extends Error {
  constructor (message) {
    super()

    this.message = message || 'unauthorized request.'
  }

  get status () {
    return 401
  }

  get name () {
    return this.constructor.name
  }
}

module.exports = UnauthorizedError
