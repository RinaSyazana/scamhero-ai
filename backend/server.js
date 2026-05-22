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

const fs = require('fs');
const path = require('path');

// Helper to read and write reports
const dataFilePath = path.join(__dirname, 'data', 'reports.json');
const getReports = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
const saveReports = (reports) => fs.writeFileSync(dataFilePath, JSON.stringify(reports, null, 2), 'utf8');

// Protected Route Example
app.get('/api/protected/dashboard-stats', authMiddleware, (req, res) => {
  // If execution reaches here, the token is valid and req.user is set
  res.json({ 
    message: 'Protected dashboard data accessed successfully', 
    user: req.user 
  });
});

// GET: Fetch all reports (public feed)
app.get('/api/reports', (req, res) => {
  try {
    const reports = getReports();
    // Sort by newest first
    const sortedReports = reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sortedReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// POST: Add a new report (community feed - no token verification needed)
app.post('/api/reports', (req, res) => {
  try {
    const { title, description, platform, location, amountLost, reportedBy } = req.body;
    const reports = getReports();

    // Create the new report object
    const newReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title || 'Untitled Report',
      description: description || '',
      platform: platform || 'Unknown',
      location: location || 'Global',
      amountLost: amountLost ? Number(amountLost) : 0,
      mediaUrls: [],
      verificationStatus: 'Published',
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      reportedBy: {
        username: (reportedBy && reportedBy.username) || 'Anonymous',
        avatarUrl: (reportedBy && reportedBy.avatarUrl) || ''
      }
    };

    reports.push(newReport);
    saveReports(reports);

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error adding report:', error);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
