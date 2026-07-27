const mongoose = require('mongoose');

//Updating variable type and setting index so it can be used for filter & sort
const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  length: {
    type: Number,
    required: true
  },
  start: {
    type: String,
    required: true,
    index: true
  },
  resort: {
    type: String,
    required: true
  },
  perPerson: {
    type: Number,
    required: true,
    index: true
  },
  image: {
  type: String,
  required: true
},

description: {
  type: String,
  required: true,
  minlength: 10
}
});

mongoose.model('trips', tripSchema);