const admin = require('../config/firebase-admin');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the ID token using the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach the validated user metadata payload to the request object
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = authMiddleware;
