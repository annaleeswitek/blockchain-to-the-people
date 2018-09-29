const Sequelize = require('sequelize')
const db = require('../db')

const Election = db.define('election', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE,
    validate: {
      isAfterStart: function(endDate) {
        if (this.startDate.getTime() > endDate.getTime()) {
          throw new Error('End date must be after the start date!');
        }
      }
    }
  },
  blockchainAddress: {
    type: Sequelize.STRING
  }
});

module.exports = Election
