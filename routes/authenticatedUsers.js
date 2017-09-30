const utils = require('../lib/utils')
const insecurity = require('../lib/insecurity')
const models = require('../models/index')

exports = module.exports = function retrieveUserList () {
  return (req, res, next) => {
    models.User.findAll().then(users => {
      const usersWithLoginStatus = utils.queryResultToJson(users)
      usersWithLoginStatus.data.forEach(user => {
        user.token = insecurity.authenticatedUsers.tokenOf(user)
      })
      res.json(usersWithLoginStatus)
    }).error(error => {
      next(error)
    })
  }
}
