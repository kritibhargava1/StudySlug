import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';



// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // 👈 your React app’s port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

//After app is initialized, add your routes
import checkinRoutes from './routes/checkin.js';
app.use('/api/checkin', checkinRoutes);

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

// Update existing profile
app.put('/api/update-profile/:uid', async (req, res) => {
  const { uid } = req.params;
  const { classes, availability } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'Missing UID' });
  }

  try {
    const updated = await UserProfile.findOneAndUpdate(
      { uid },
      { $set: { classes, availability } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile updated!', user: updated });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Internal server error' });
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

// Check if user already has a profile
app.get('/api/profile-exists/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await UserProfile.findOne({ uid });
    res.json({ exists: !!user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check user profile' });
  }
});

/* ============================
   Gemini SDK Configuration
   ============================ */

// Import and initialize the Gemini SDK
import { GoogleGenerativeAI } from '@google/generative-ai';

// Create an instance of the Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Get the generative model you wish to use (e.g., "gemini-1.5-flash")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/* ============================
   Gemini Chat Endpoint
   ============================ */

/**
 * POST /api/gemini-chat
 * This endpoint receives JSON with:
 *   - chat: string (the user’s message)
 *   - history: Array (optional conversation history)
 *
 * It sends the user's message to the Gemini API and returns the generated response.
 */
app.post('/api/gemini-chat', async (req, res) => {
  try {
    // Extract the user's message and history.
    // We expect the frontend to send the key "chat" (adjust if necessary).
    const chatHistory = req.body.history || [];
    const msg = req.body.chat || req.body.message;

    // Start a new chat session with any conversation history.
    const chat = model.startChat({ history: chatHistory });
    
    // Send the user's message to Gemini.
    const result = await chat.sendMessage(msg);
    
    // Await and extract the complete response.
    const response = await result.response;
    const text = response.text();
    
    // Return the generated response as JSON.
    res.json({ text: text });
  } catch (error) {
    console.error("Error processing Gemini chat request:", error);
    res.status(500).json({ text: "An error occurred while processing your message." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
