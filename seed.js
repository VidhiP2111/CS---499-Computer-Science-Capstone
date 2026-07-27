const mongoose = require('mongoose');

const dbURI = "mongodb+srv://pvidhi818_db_user:uH6qL0tWZtaGz2Xm@cluster0.nwb6kd6.mongodb.net/travlr-app?appName=Cluster0";

mongoose.connect(dbURI);

require('./app_server/models/travlr');
const Trip = mongoose.model('trips');


const trips = [
  {
    name: 'Beach Paradise',
    length: 7,
    start: 'Miami',
    resort: 'Ocean View Resort',
    perPerson: 1200,
    image: 'images/beach.jpg',
    description: 'Relax on sunny beaches with beautiful ocean views.'
  },
  {
    name: 'Mountain Adventure',
    length: 5,
    start: 'Denver',
    resort: 'Rocky Mountain Lodge',
    perPerson: 950,
    image: 'images/mountain.jpg',
    description: 'Explore mountain trails and outdoor adventures.'
  },
  {
    name: 'City Escape',
    length: 3,
    start: 'New York',
    resort: 'Downtown Hotel',
    perPerson: 800,
    image: 'images/city.jpg',
    description: 'Experience nightlife, restaurants, and shopping.'
  }
];

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB');
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
  console.log('Database seeded successfully!');
  mongoose.connection.close();
});