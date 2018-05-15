const router = require('express').Router()
const {User, Community, Election, Candidate} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'name', 'email', 'isAdmin', 'communityId'],
    include: [{
      model: Community, include: [{
        model: Election, include: [{
          model: Candidate
        }]
      }]
    }]
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/community/:id', (req, res, next) => {
  User.findAll({
    where: {
      communityId: req.params.id
    }
  })
  .then(communityMembers => res.json(communityMembers))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {include: [{
    model: Community, include: [{
      model: Election, include: [{
        model: Candidate
      }]
    }]
  }]
  })
    .then(user => res.json(user))
    .catch(next);
});
