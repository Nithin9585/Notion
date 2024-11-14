import { getFirestore } from "firebase/firestore";
import { initializeApp,getApp,getApps } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyA_gd9Zp8gSPw7rHug919WLcoNekTRsXdI",
  authDomain: "notion-clone-b95f2.firebaseapp.com",
  projectId: "notion-clone-b95f2",
  storageBucket: "notion-clone-b95f2.firebasestorage.app",
  messagingSenderId: "88350474360",
  appId: "1:88350474360:web:629ed420f95a49367b6d8d",
  measurementId: "G-ZW6K7YHTHY"
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig):getApp();

const db = getFirestore(app);

export {db};
