const Sequelize = require('sequelize')
const db = require('../db')

const Candidate = db.define('candidate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.myiconfinder.com/uploads/iconsets/ac7256a56da1fa7c09a699ddec407e7e-human.png'
  },
  affiliation: {
    type: Sequelize.STRING
  },
  arrayIndex: {
    type: Sequelize.INTEGER
  },
  voteCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
});

module.exports = Candidate

