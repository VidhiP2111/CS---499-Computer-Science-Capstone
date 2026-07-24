const express = require('express');
const router = express.Router();

const ctrlTravlr = require('../controllers/travlrController');

router.get('/travel', ctrlTravlr.travel);

module.exports = router;