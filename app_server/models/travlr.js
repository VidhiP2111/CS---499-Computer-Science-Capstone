const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  resort: {
    type: String,
    required: true
  },
  perPerson: {
    type: String,
    required: true
  },
  image: String,
  description: String
});

mongoose.model('trips', tripSchema);