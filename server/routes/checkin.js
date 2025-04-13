import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Create Schema
const checkInSchema = new mongoose.Schema({
  uid: String,
  email: String,
  location: String,
  availableUntil: String,
  checkedInAt: { type: Date, default: Date.now }
});

// Model
const CheckIn = mongoose.model('CheckIn', checkInSchema);

// POST: Save check-in
router.post('/', async (req, res) => {
  const { uid, email, location, availableUntil } = req.body;
  try {
    const newCheckin = new CheckIn({ uid, email, location, availableUntil });
    await newCheckin.save();
    res.status(200).json({ message: 'Checked in!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check in.' });
  }
});

// GET: Fetch active check-ins (not expired)
router.get('/', async (req, res) => {
  try {
    const all = await CheckIn.find({});
    const now = new Date();

    const active = all.filter(entry => {
      const [hour, minute] = entry.availableUntil.split(':');
      const until = new Date(entry.checkedInAt);
      until.setHours(parseInt(hour), parseInt(minute));
      
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
    
      return until <= endOfToday && new Date() <= until; // still valid today
    });

    res.status(200).json(active);
  } catch (err) {
    console.error('Error fetching check-ins:', err);
    res.status(500).json({ error: 'Failed to fetch check-ins' });
  }
});


export default router;
