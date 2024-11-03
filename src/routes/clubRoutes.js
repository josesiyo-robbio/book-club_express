



const express = require('express');
const router = express.Router();
const clubController = require('../controller/clubController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/club/create',clubController.new_club);
router.post('/review/create',authenticateToken,clubController.new_review);
router.post('/book/new',clubController.new_book);
router.post('/book/vote',clubController.new_vote_counter);
router.patch('/book/actual-update',clubController.new_current_book);

module.exports = router;