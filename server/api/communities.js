const router = require('express').Router()
const {Community, Election} = require('../db/models')
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
