const Sequelize = require('sequelize')
const router = require('express').Router()
const {Community, Election, Candidate} = require('../db/models')
const Op = Sequelize.Op;
module.exports = router

router.get('/', (req, res, next) => {
  Community.findAll({include: [{model: Election}]
  })
    .then(communities => res.json(communities))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Community.findById(req.params.id, {include: [{model: Election}]
  })
    .then(community => res.json(community))
    .catch(next)
})

router.get('/:id/activeElection', (req, res, next) => {
  Election.findOne({
    where: {
      communityId: req.params.id,
      startDate: {
        [Op.lte]: Date.now()
      },
      endDate: {
        [Op.gte]: Date.now()
      }
    },
    include: [{model: Candidate}]
  })
  .then(theActiveElection => res.json(theActiveElection))
  .catch(next);
})
