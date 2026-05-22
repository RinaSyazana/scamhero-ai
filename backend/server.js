const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = require('./routes/authMiddleware');

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ScamHero AI Backend' });
});

// Protected Route Example
app.get('/api/protected/dashboard-stats', authMiddleware, (req, res) => {
  // If execution reaches here, the token is valid and req.user is set
  res.json({ 
    message: 'Protected dashboard data accessed successfully', 
    user: req.user 
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
