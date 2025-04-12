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
  uid: { type: String, required: true },
  email: { type: String, required: true },
  classes: [
    {
      course: String,
      year: String,
      quarter: String,
    },
  ],
  availability: {
    type: Map,
    of: [
      {
        from: String,
        to: String,
      },
    ],
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Route to save user profile
app.post('/api/signup', async (req, res) => {
  const { uid, email, classes, availability } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: 'Missing UID or email' });
  }

  try {
    const result = await UserProfile.create({ uid, email, classes, availability });
    res.status(200).json({ message: 'Signup stored!', user: result });
  } catch (err) {
    console.error('MongoDB insert error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Route to fetch all students
app.get('/api/all-students', async (req, res) => {
  try {
    const students = await UserProfile.find({});
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to fetch student data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
