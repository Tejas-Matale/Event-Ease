import mongoose from 'mongoose';
import { sample_event } from '../data';

// Define event schema
const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  Time: String,
  price: Number,
  location: [String],
  description: String,
  count: Number,
  imageUrl: String,
  tags: [String],
});

// Define event model with the collection name 'eventmodels'
const EventModel = mongoose.model('eventmodels', eventSchema);

// Insert sample_event data into MongoDB
const insertSampleEvents = async () => {
  try {
    // Delete existing events to avoid duplicates
    await EventModel.deleteMany({});
    // Insert sample_event data
    await EventModel.insertMany(sample_event);
    console.log('Sample events inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample events:', error);
  }
};

// Call the function to insert sample events when connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/event')
  .then(async () => {
    console.log('MongoDB connection open');
    await insertSampleEvents();
  })
  .catch(err => {
    console.log('MongoDB connection error');
    console.error(err);
  });
