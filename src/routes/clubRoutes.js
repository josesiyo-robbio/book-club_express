



const express = require('express');
const router = express.Router();
const clubController = require('../controller/clubController');

router.post('/club/create',clubController.new_club);
router.post('/review/create',clubController.new_review);
router.post('/book/new',clubController.new_book);

module.exports = router;