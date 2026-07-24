const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripName', tripsController.tripsFindCode);
router.post('/trips', tripsController.tripsAddTrip);
router.put('/trips/:tripName', tripsController.tripsUpdateTrip);
router.delete('/trips/:tripName', tripsController.tripsDeleteTrip);

module.exports = router;