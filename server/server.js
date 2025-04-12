import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema and Model
const userProfileSchema = new mongoose.Schema({
  uid: String,
  email: String,
  classes: Array,
  availability: String,
  mode: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Route to save user profile
app.post('/api/signup', async (req, res) => {
  const { uid, email, classes, availability, mode } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updated = await UserProfile.findOneAndUpdate(
      { uid },
      { uid, email, classes, availability, mode },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Profile saved!', data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving profile' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
