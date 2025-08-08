import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5X1DbmxGGI6IuGd3F1DlfS73kCh9FboQ",
  authDomain: "swyft-c871f.firebaseapp.com",
  projectId: "swyft-c871f",
  storageBucket: "swyft-c871f.appspot.com",
  messagingSenderId: "237453824671",
  appId: "1:237453824671:web:c5150f42adb05deea648aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
