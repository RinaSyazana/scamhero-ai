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
const multer = require('multer');

// Configure multer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static uploads
app.use('/uploads', express.static(uploadDir));

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
app.post('/api/reports', upload.array('media', 5), (req, res) => {
  try {
    const { title, description, platform, location, amountLost } = req.body;
    let reportedBy = req.body.reportedBy;
    
    // If sent from FormData, reportedBy might be a string
    if (typeof reportedBy === 'string') {
      try {
        reportedBy = JSON.parse(reportedBy);
      } catch (e) {
        // use fallback if parse fails
      }
    }

    const reports = getReports();

    const mediaUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Create the new report object
    const newReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title || 'Untitled Report',
      description: description || '',
      platform: platform || 'Unknown',
      location: location || 'Global',
      amountLost: amountLost ? Number(amountLost) : 0,
      mediaUrls: mediaUrls,
      verificationStatus: 'Published',
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      reportedBy: {
        username: (reportedBy && reportedBy.username) || 'Anonymous',
        avatarUrl: (reportedBy && reportedBy.avatarUrl) || '',
        uid: (reportedBy && reportedBy.uid) || ''
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

// DELETE: Delete a report (only by the owner)
app.delete('/api/reports/:id', authMiddleware, (req, res) => {
  try {
    const reportId = req.params.id;
    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === reportId);

    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = reports[reportIndex];

    // Verify ownership: the authenticated user's uid must match the report's uid
    if (report.reportedBy.uid !== req.user.uid) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own reports' });
    }

    // Delete associated media files from disk
    if (report.mediaUrls && report.mediaUrls.length > 0) {
      report.mediaUrls.forEach(url => {
        const filename = url.replace('/uploads/', '');
        const filePath = path.join(uploadDir, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    // Remove the report and save
    reports.splice(reportIndex, 1);
    saveReports(reports);

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
