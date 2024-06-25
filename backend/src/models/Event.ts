import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  time: String,
  price: Number,
  location: [String],
  description: String,
  count: Number,
  imageUrl: String,
  tags: [String],
});

const EventModel = mongoose.model('event', eventSchema);

export default EventModel;
