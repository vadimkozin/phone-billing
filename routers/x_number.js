const router = require('express').Router();
const { x_number: numController } = require('../controllers');

// router.param('id', authorController.findAuthor);

router.get('/', numController.showNumbers);
module.exports = router;