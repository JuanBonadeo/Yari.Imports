import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbHCLgbPv7-xzCEo7AMHcpBRnIxOmF7vg",
  authDomain: "yaris-import.firebaseapp.com",
  projectId: "yaris-import",
  storageBucket: "yaris-import.firebasestorage.app",
  messagingSenderId: "671724958249",
  appId: "1:671724958249:web:241f3c8c75227321632238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreInstance = () => {
  return getFirestore(app);
};

//Initialize Firestore
export const db = getFirestore(app)

