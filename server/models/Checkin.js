
import mongoose from 'mongoose';

const checkinSchema = new mongoose.Schema({
  uid: String,
  email: String,
  location: String,
  availableUntil: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Checkin', checkinSchema);