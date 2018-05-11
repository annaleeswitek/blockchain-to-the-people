const Sequelize = require('sequelize');
const router = require('express').Router();
const {Community, Election, Candidate} = require('../db/models');
const Op = Sequelize.Op;
module.exports = router

//if time, move to own file for platform managers, who can see all communities
router.get('/all', (req, res, next) => {
  Community.findAll({include: [{model: Election}]
  })
    .then(communities => res.json(communities))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Community.findById(req.params.id, {include: [
      {model: Election,
      include: [Candidate]
      }
    ]
  })
    .then(community => res.json(community))
    .catch(next);
});

router.get('/:id/active', (req, res, next) => {
  Community.findById(req.params.id, {include: [{model: Election}]})
    .then(community => community.getElections({
      where: {
        startDate: {
          [Op.lte]: Date.now()
        },
        endDate: {
          [Op.gte]: Date.now()
        }
      },
      include: [{model: Candidate}]
    }))
    .then(electionArr => res.json(electionArr[0]))
    .catch(next);
});


router.get('/:id/upcoming', (req, res, next) => {
  Community.findById(req.params.id, { include: [{ model: Election }] })
    .then(community => community.getElections({
      where: {
        startDate: {
          [Op.gte]: Date.now()
        }
      },
      include: [{ model: Candidate }]
    }))
    .then(electionArr => res.json(electionArr))
    .catch(next);
});

router.get('/:id/history', (req, res, next) => {
  Community.findById(req.params.id, { include: [{ model: Election }] })
    .then(community => community.getElections({
      where: {
        endDate: {
          [Op.lte]: Date.now()
        }
      },
      include: [{ model: Candidate }]
    }))
    .then(electionArr => {
      console.log('electionARR ', electionArr)
      res.json(electionArr)
    })
    .catch(next);
});

router.post('/:id/newElection', (req, res, next) => {
  console.log("REQ BODY ", req.body)
  console.log("REQ PARAMS", req.params.id)
  Election.create({name: req.body.name, startDate: req.body.startDate, endDate: req.body.endDate, blockchainAddress: req.body.blockchainAddress})
    .then(returnedElection => {
      console.log('went down to post in db', returnedElection)
      console.log('req params again', req.params.id)
      returnedElection.setCommunity(req.body.foreignId)
    })
    .then(finishedElection => res.json(finishedElection))
    .catch(next);
})
