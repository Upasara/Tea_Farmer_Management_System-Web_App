import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_APP_ID,
  measurementId: process.env.REACT_APP_PUBLIC_MEASUREMENT
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export {db,auth}
