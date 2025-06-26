// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiXusSTNxpwZtVoF9VyLuDO2zCo4ngB4Q",
  authDomain: "sacred-dreamspace.firebaseapp.com",
  projectId: "sacred-dreamspace",
  storageBucket: "sacred-dreamspace.firebasestorage.app",
  messagingSenderId: "241073887466",
  appId: "1:241073887466:web:fdf78185a244aae3d11f93"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
