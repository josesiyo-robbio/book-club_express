



const express = require('express');
const router = express.Router();
const clubController = require('../controller/clubController');

router.post('/club/create',clubController.new_club);  //#1C COMPANY inicio de sesion

module.exports = router;