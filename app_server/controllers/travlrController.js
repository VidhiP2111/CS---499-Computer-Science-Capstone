const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const travel = async (req, res) => {
  try {

    //This is to hide soft delete trips
    const trips = await Trip.find({
       deleted: false 
      }
      //As this is a read-only query lean() will help to improve the perforrmance 
    ).lean();

    res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });
  } catch (err) {
    res.status(500).send('Error retrieving trips');
  }
};

module.exports = {
  travel
};