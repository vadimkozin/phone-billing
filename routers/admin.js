const router = require('express').Router();

const { admin: { showAdmin } } = require('../controllers');

router.get('/', showAdmin);

module.exports = router;