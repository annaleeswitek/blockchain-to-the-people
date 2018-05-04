const router = require('express').Router()
const {Candidate} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Candidate.findAll()
    .then(candidates => res.json(candidates))
    .catch(next)
})

router.get('/:electionId', (req, res, next) => {
  Candidate.findAll({
    where: {
      electionId: req.params.electionId
    }
  })
    .then(canditates => res.json(canditates))
    .catch(next)
})
