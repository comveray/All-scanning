'use strict'

var utils = require('../lib/utils')
var models = require('../models/index')
var challenges = require('../data/datacache').challenges

exports = module.exports = function searchProducts () {
  return function (req, res, next) {
    var criteria = req.query.q === 'undefined' ? '' : req.query.q || ''
    if (utils.notSolved(challenges.localXssChallenge) && utils.contains(criteria, '<script>alert("XSS1")</script>')) {
      utils.solve(challenges.localXssChallenge)
    }
    models.sequelize.query('SELECT * FROM Products WHERE ((name LIKE \'%' + criteria + '%\' OR description LIKE \'%' + criteria + '%\') AND deletedAt IS NULL) ORDER BY name')
      .success(function (products) {
        if (utils.notSolved(challenges.unionSqlInjectionChallenge)) {
          var dataString = JSON.stringify(products)
          console.log(dataString)
          var solved = true
          models.User.findAll().success(function (data) {
            var users = utils.queryResultToJson(data)
            if (users.data && users.data.length) {
              for (var i = 0; i < users.data.length; i++) {
                console.log(users.data[i])
                solved = solved && utils.containsOrEscaped(dataString, users.data[ i ].email) && utils.contains(dataString, users.data[ i ].password)
                if (!solved) {
                  break
                }
              }
              if (solved) {
                utils.solve(challenges.unionSqlInjectionChallenge)
              }
            }
          })
        }
        res.json(utils.queryResultToJson(products))
      }).error(function (error) {
        next(error)
      })
  }
}
