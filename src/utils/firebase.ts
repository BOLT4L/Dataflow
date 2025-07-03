import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDst2-XEXdqr0SD_9EnpA39RTL69t1z7yQ",
  authDomain: "dataflow-login.firebaseapp.com",
  projectId: "dataflow-login",
  storageBucket: "dataflow-login.appspot.com",
  messagingSenderId: "902152663485",
  appId: "1:902152663485:web:ee43a30d19e4fcb135e2d4",
  measurementId: "G-JS266T7M1B"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app); 