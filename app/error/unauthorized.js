class UnauthorizedError extends Error {
  constructor (message) {
    super()

    if (message) {
      this.message = message
    }
  }

  get status () {
    return 401
  }

  get message () {
    return 'unauthorized request.'
  }

  get name () {
    return this.constructor.name
  }
}

module.exports = UnauthorizedError
