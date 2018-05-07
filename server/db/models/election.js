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
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE,
    validate: { //not sure if this works
      isAfterStart: function(endDate) {
        if (this.startDate.getTime() > endDate.getTime()) {
          throw new Error('End date must be after the start date!');
        }
      }
    }
  }
});

module.exports = Election
