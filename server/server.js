const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // For parsing JSON bodies

// Connect to MongoDB using your connection string (replace <connection_string> with your MongoDB URI)
mongoose
  .connect('mongodb+srv://lakshana:<db_password>@cluster0.rxokcqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose schema for a user signing up
const userSchema = new mongoose.Schema({
  classes: [
    {
      course: String,
      year: String,
      quarter: String,
    },
  ],
  availability: String,
  mode: String, // "tutor" or "group"
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// API Endpoint for signup
app.post('/api/signup', async (req, res) => {
  try {
    const { classes, availability, mode } = req.body;
    // You might add some validations here
    const user = new User({ classes, availability, mode });
    await user.save();
    res.status(201).json({ message: 'User signed up successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example endpoint to match users (very basic example)
app.get('/api/matches', async (req, res) => {
  const { course, availability } = req.query;
  try {
    const matches = await User.find({
      'classes.course': course,
      availability: availability,
    });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
