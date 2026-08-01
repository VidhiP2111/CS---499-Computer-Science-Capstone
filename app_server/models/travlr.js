const mongoose = require('mongoose');

//Updating variable type and setting index so it can be used for filter & sort
const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  length: {
    type: Number,
    required: true,
    min: 1,
    max: 60
  },
  start: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  resort: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  perPerson: {
    type: Number,
    required: true,
    index: true,
    min: 0,
    max: 100000
  },
  image: {
  type: String,
  required: true
},

description: {
  type: String,
  required: true,
  minlength: 10,
  maxlength: 1000
},

// Adding deleted flag and deletedAt so records are recoverable instead of removed
deleted: {
  type: Boolean,
  default: false,
  index: true
},

deletedAt: {
  type: Date,
  default: null
}
}, {
  // Adding timestamps option to auto-tracks createdAt and updatedAt
  timestamps: true
});


//This is to update indexes to compound indexes
//as queries always filter by deleted plus another field
tripSchema.index({ 
  deleted: 1,
  start: 1 
});

tripSchema.index({
  deleted: 1,
  perPerson: 1
});

mongoose.model('trips', tripSchema);