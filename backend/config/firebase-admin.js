const admin = require('firebase-admin');

// Ensure that your environment has GOOGLE_APPLICATION_CREDENTIALS set 
// to the path of your service account json file if you are using it outside GCP.
// For local development without a specific key, we can try to initialize with default credentials
// or fallback to a mock initialization to prevent crashes if the key isn't present yet.

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
} catch (error) {
  console.warn("Firebase Admin Initialization Warning (Mock fallback used if no creds):", error.message);
  if (!admin.apps.length) {
    admin.initializeApp();
  }
}

module.exports = admin;
