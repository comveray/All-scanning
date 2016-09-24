'use strict'

exports.config = {
  directConnect: true,

  allScriptsTimeout: 80000,

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 80000
  },

  onPrepare: function () {
    require('jasmine-reporters')
    jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('build/reports/e2e_results', true, true))
  },

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY

}

if (process.env.TRAVIS_BUILD_NUMBER) {
  exports.config.directConnect = false
  exports.config.seleniumAddress = 'http://localhost:4445/wd/hub'
  exports.config.capabilities = {
    'name': 'OWASP Juice Shop e2e Tests',
    'browserName': 'chrome',
    'platform': 'OS X 10.11',
    'screen-resolution': '1024x768',
    'username': process.env.SAUCE_USERNAME,
    'accessKey': process.env.SAUCE_ACCESS_KEY,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'tags': [process.env.TRAVIS_BRANCH, process.env.TRAVIS_BUILD_NUMBER, 'e2e'],
    'recordVideo': false,
    'recordScreenshots': false

  }
}
