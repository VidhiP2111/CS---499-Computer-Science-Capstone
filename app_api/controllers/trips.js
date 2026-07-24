const mongoose = require('mongoose');
const handleError = require('../../app_server/utils/errorHandler');

const Trip = mongoose.model('trips');


// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: 'No trips found'
      });
    }

    return res.status(200).json(trips);

  } catch (err) {
    return handleError(res, err);
  }
};


// GET single trip by name
const tripsFindCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      name: req.params.tripName
    });

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);

  } catch (err) {
    return handleError(res, err);
  }
};


// CREATE new trip
const tripsAddTrip = async (req, res) => {
  try {

    if (
      !req.body.name ||
      !req.body.length ||
      !req.body.start ||
      !req.body.resort ||
      !req.body.perPerson ||
      !req.body.image ||
      !req.body.description
    ) {
      return res.status(400).json({
        message: "All trip fields are required"
      });
    }


    const trip = await Trip.create({
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });


    return res.status(201).json(trip);


  } catch (err) {
    return handleError(res, err);
  }
};


// UPDATE trip
const tripsUpdateTrip = async (req, res) => {
  try {

    const trip = await Trip.findOneAndUpdate(
      {
        name: req.params.tripName
      },
      {
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      {
        new: true
      }
    );


    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }


    return res.status(200).json(trip);


  } catch (err) {
    return handleError(res, err);
  }
};


// DELETE trip
const tripsDeleteTrip = async (req, res) => {
  try {

    const trip = await Trip.findOneAndDelete({
      name: req.params.tripName
    });


    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }


    return res.status(200).json({
      message: 'Trip deleted successfully'
    });


  } catch (err) {
    return handleError(res, err);
  }
};


module.exports = {
  tripsList,
  tripsFindCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};