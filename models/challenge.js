/* jslint node: true */
'use strict'

module.exports = function (sequelize, DataTypes) {
  const Challenge = sequelize.define('Challenge', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    hint: DataTypes.STRING,
    hintUrl: DataTypes.STRING,
    solved: DataTypes.BOOLEAN
  })
  return Challenge
}
