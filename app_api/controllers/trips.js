const mongoose = require('mongoose');
const handleError = require('../../app_server/utils/errorHandler');

const Trip = mongoose.model('trips');


// Updating tripsList to perform enhanced search with page, limit and skip
const tripsList = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    //Checking page & limit before performing full search
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    let skip = (page - 1) * limit;

    //excluding soft-deleted trips from list results
    let query = { 
      deleted: false
     };

    if (req.query.start) {
      query.start = req.query.start;
    }

    if (req.query.maxPrice && !isNaN(Number(req.query.maxPrice))) {
      query.perPerson = { $lte: Number(req.query.maxPrice) };
    }

    let sortOptions = {};
    if (req.query.sort) {
      let sortOrder = req.query.order === 'desc' ? -1 : 1;
      sortOptions[req.query.sort] = sortOrder;
    }

    const trips = await Trip.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

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

const tripsFindCode = async (req, res) => {
  try {

    //As this is a read-only query lean() will help to improve the perforrmance 
    const trip = await Trip.findOne({
      name: req.params.tripName,
      //excluding soft-deleted trips from single lookup
      deleted: false
    }).lean();

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

    //logging so it shows when trips get created
    console.log(new Date().toISOString(), 'Trip created:', trip.name);


    return res.status(201).json(trip);


  } catch (err) {
    return handleError(res, err);
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {

    const trip = await Trip.findOneAndUpdate(
      {
        name: req.params.tripName,
        //This is to prevent edits to a trip that is already been soft deleted
        deleted: false
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
        new: true,
        // Enabling validators on update since Mongoose skips them by default
        runValidators: true
      }
    );


    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    //This is to see when trips get updated
    console.log(new Date().toISOString(), 'Trip updated:', trip.name);

    return res.status(200).json(trip);


  } catch (err) {
    return handleError(res, err);
  }
};

const tripsDeleteTrip = async (req, res) => {
  try {

    //marking it as deleted instead of removing the record 
    //this can be helpful to restore it later
    const trip = await Trip.findOneAndUpdate({
        name: req.params.tripName,
        deleted: false
      },
      {
        deleted: true,
        deletedAt: Date.now()
      },
      {
        new: true
      });


    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    //logging when trips get soft-deleted
    console.log(new Date().toISOString(), 'Trip soft-deleted:', trip.name);


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