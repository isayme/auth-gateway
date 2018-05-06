const request = require('supertest')
const assert = require('power-assert')
const { HeaderAccelRedirect, HeaderViewerId } = require('app/constants')
const app = require('app/app')
const testUtil = require('test/util')

describe('X-Accel-Redirect', () => {
  it('should have accel redirect header', async () => {
    let res = await request(app).get('/')

    assert.equal(res.statusCode, 101)
    assert.equal(res.get(HeaderAccelRedirect), '@accel')
  })
})

describe('X-Internal-ViewerID', () => {
  it('should clear', async () => {
    let res = await request(app)
      .get('/')
      .set(HeaderViewerId, '55c0492f3dfd04cd5302ca06')

    assert.equal(res.statusCode, 101)
    assert.equal(res.get(HeaderViewerId), undefined)
  })

  it('should have viewerid if token valid', async () => {
    const uid = '55c0492f3dfd04cd5302ca06'
    const token = await testUtil.signToken({ uid })
    let res = await request(app)
      .get('/')
      .query({
        access_token: token
      })

    assert.equal(res.statusCode, 101)
    assert.equal(res.get(HeaderViewerId), uid)
  })

  it('should reject if token invalid', async () => {
    const uid = '55c0492f3dfd04cd5302ca06'
    const token = await testUtil.signToken({ uid }, 'wrong secret')

    let res = await request(app)
      .get('/')
      .query({
        access_token: token
      })

    assert.equal(res.statusCode, 401)
    assert.equal(res.get(HeaderViewerId), undefined)
    assert.equal(res.body.name, 'UnauthorizedError')
  })
})
