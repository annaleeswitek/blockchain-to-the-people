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
  },
  blockchainAddress: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('active', 'upcoming', 'complete'),
    defaultValue: 'upcoming'
  }
});

Election.prototype.setToActive = () => {
  console.log('this inside setToActive', this)
  // console.log('status before', this.status)
  this.update({status: 'active'}).then(theShit => console.log(theShit)).catch(err => console.error(err))

  // console.log('this.status', this.status)
  // console.log('setToActive has run')
}

// Election.prototype.setToActive = Election.prototype.setToActive.bind(this);

Election.prototype.setToComplete = function () {
  this.status = 'complete';
  console.log('setToComplete has run')
}

Election.hook = ('beforeSave', (electionInstance) => {
  electionInstance.setToActive = electionInstance.setToActive.bind(Election);
  const now = new Date().getTime();
  const startTime = electionInstance.startDate.getTime();
  const when = startTime - now;
  setTimeout(electionInstance.setToActive, when)
  console.log('when have done it?');
  console.log('now', now)
  console.log('when', when)
})

module.exports = Election
