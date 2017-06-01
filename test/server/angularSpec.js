var sinon = require('sinon')
var chai = require('chai')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

describe('angular', function () {
  var angular, req, res, next

  beforeEach(function () {
    angular = require('../../routes/angular')
    res = { sendFile: sinon.spy() }
    next = sinon.spy()
  })

  it('should return index.html for any URL', function () {
    req = {url: '/any/thing'}

    angular()(req, res, next)

    expect(res.sendFile).to.have.been.calledWith(sinon.match(/index\.html/))
  })

  it('should raise error for /api endpoint URL', function () {
    req = {url: '/api'}

    angular()(req, res, next)

    expect(res.sendFile).to.have.not.been.called
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error))
  })

  it('should raise error for /rest endpoint URL', function () {
    req = {url: '/rest'}

    angular()(req, res, next)

    expect(res.sendFile).to.have.not.been.called
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error))
  })
})
