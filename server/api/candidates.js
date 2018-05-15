//not using these routes
const Sequelize = require('sequelize');
const router = require('express').Router();
const { Candidate } = require('../db/models');
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

// need /election/:electionId
router.post('/:electionId', (req, res, next) => {
  console.log('req body here, ', req.body);
  console.log('req.params here, ', req.params);
  Candidate.create(req.body)
    .then(createdCandidate => createdCandidate.setElection(req.params.electionId))
    .then(finished => res.json(finished))
    .catch(next);
})

router.put('/:candidateId', (req, res, next) => {
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
