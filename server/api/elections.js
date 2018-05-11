const Sequelize = require('sequelize')
const router = require('express').Router()
const {Election, Candidate} = require('../db/models')
const Op = Sequelize.Op;
module.exports = router

router.get('/', (req, res, next) => {
  Election.findAll({include: [{model: Candidate}]
  })
    .then(elections => res.json(elections))
    .catch(next)
});

router.get('/active', (req, res, next) => {
  Election.findAll({
    where: {
      startDate: {
        [Op.lte]: Date.now()
      },
      endDate: {
        [Op.gte]: Date.now()
      }
    },
    include: [{model: Candidate}]
  })
    .then(election => res.json(election))
    .catch(next)
});

router.get('/upcoming', (req, res, next) => {
  Election.findAll({
    where: {
      startDate: {
        [Op.gte]: Date.now()
      }
    },
    include: [{model: Candidate}]
  })
    .then(election => res.json(election))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Election.findById(req.params.id, {include: [{model: Candidate}]
  })
    .then(election => res.json(election))
    .catch(next)
});
