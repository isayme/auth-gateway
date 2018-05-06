const assert = require('power-assert')
const util = require('app/util')

describe('util', () => {
  describe('asyncWrap', () => {
    it('name', () => {
      async function testName (req, res) {

      }

      assert.equal(util.asyncWrap(testName).name, 'testName')
    })

    it('resolve', async () => {
      async function testName (req, res) {
      }

      const md = util.asyncWrap(testName)

      await new Promise((resolve, reject) => {
        md(null, null, err => {
          assert.equal(err, null)
          resolve()
        })
      })
    })

    it('reject', async () => {
      const msg = 'err_msg'
      async function testName (req, res) {
        throw new Error(msg)
      }

      const md = util.asyncWrap(testName)

      await new Promise((resolve, reject) => {
        md(null, null, err => {
          assert.equal(err.message, msg)
          resolve()
        })
      })
    })
  })
})
