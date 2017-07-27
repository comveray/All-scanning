const frisby = require('frisby')
var fs = require('fs')
var path = require('path')
var FormData = require('form-data')

const URL = 'http://localhost:3000'

describe('/file-upload', function () {
  var file, form

  xit('POST file valid for client and API', function (done) {
    file = path.resolve(__dirname, '../files/validSizeAndTypeForClient.pdf')
    form = new FormData()
    form.append('file', fs.createReadStream(file))

    frisby.post(URL + '/file-upload', { headers: form.getHeaders(), body: form })
      .expect('status', 204)
      .done(done)
  })

  xit('POST file too large for client validation but valid for API', function (done) {
    file = path.resolve(__dirname, '../files/invalidSizeForClient.pdf')
    form = new FormData()
    form.append('file', fs.createReadStream(file))

    frisby.post(URL + '/file-upload', { headers: form.getHeaders(), body: form })
      .expect('status', 204)
      .done(done)
  })

  xit('POST file with illegal type for client validation but valid for API', function (done) {
    file = path.resolve(__dirname, '../files/invalidTypeForClient.exe')
    form = new FormData()
    form.append('file', fs.createReadStream(file))

    frisby.post(URL + '/file-upload', { headers: form.getHeaders(), body: form })
      .expect('status', 204)
      .done(done)
  })

  xit('POST file too large for API', function (done) {
    file = path.resolve(__dirname, '../files/invalidSizeForServer.pdf')
    form = new FormData()
    form.append('file', fs.createReadStream(file))

    frisby.post(URL + '/file-upload', { headers: form.getHeaders(), body: form })
      .expect('status', 500)
      .done(done)
  })
})
