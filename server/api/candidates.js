//not using these routes
const Sequelize = require('sequelize');
const router = require('express').Router();
const {Candidate} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Candidate.findAll()
    .then(candidates => res.json(candidates))
    .catch(next)
});

router.get('/:electionId', (req, res, next) => {
  Candidate.findAll({
    where: {
      electionId: req.params.electionId
    }
  })
    .then(canditates => res.json(canditates))
    .catch(next)
});

router.put('/:candidateId', (req, res, next) => {
  // console.log('req.params', req.params)
  // console.log('here is req.body', req.body);
  Candidate.update({voteCount: req.body.count}, {
    where: {id: req.params.candidateId},
    returning: true
  })
  .then(updatedCandidate => {
    console.log('updated candidate success!!')
    res.status(201).json(updatedCandidate[1][0])
  })
  .catch(next);
});
