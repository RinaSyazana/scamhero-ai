import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfwYPCaJJPjGszrzSfxIdu594_fRtHzFI",
  authDomain: "scamhero-ai.firebaseapp.com",
  projectId: "scamhero-ai",
  storageBucket: "scamhero-ai.firebasestorage.app",
  messagingSenderId: "1044911262051",
  appId: "1:1044911262051:web:992512e6bfe6c56a956b56",
  measurementId: "G-JW0PCME249"
};

// Initialize Firebase securely preventing double-initialization in React strict mode
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, analytics };