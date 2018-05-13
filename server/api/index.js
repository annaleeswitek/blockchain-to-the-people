const router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/elections', require('./elections'));
router.use('/candidates', require('./candidates'));
router.use('/community', require('./communities'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
