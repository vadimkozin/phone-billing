const router = require('express').Router();
const { direction: {showDirections, showDirectionById, findDirection} }  = require('../controllers');

router.get('/', showDirections);
router.get('/:id', findDirection, showDirectionById );

module.exports = router;

