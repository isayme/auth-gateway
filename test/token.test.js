const assert = require('power-assert')
const { HeaderAccessToken } = require('app/constants')
const tokenUtil = require('app/token')

describe('token util', () => {
  describe('get token', () => {
    it('header', () => {
      const req = {
        get (name) {
          return this.headers[name]
        },
        headers: {
          [HeaderAccessToken]: 'Bearer access_x_token'
        }
      }

      const token = tokenUtil.get(req)
      assert.equal(token, 'access_x_token')
    })

    it('query', () => {
      const req = {
        get (name) {
          return this.headers[name.toLowerCase()]
        },
        headers: {},
        query: {
          access_token: 'access_x_token'
        }
      }

      const token = tokenUtil.get(req)
      assert.equal(token, 'access_x_token')
    })
  })
})
