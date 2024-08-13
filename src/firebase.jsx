


// firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyDuan1a25b1bjjrqbaPwd1B_ob70KgC1jY",
        authDomain: "weather-app-4e236.firebaseapp.com",
        projectId: "weather-app-4e236",
        storageBucket: "weather-app-4e236.appspot.com",
        messagingSenderId: "377793860215",
        appId: "1:377793860215:web:8c72730b70b3346af52c72",
        measurementId: "G-XX59LZJSGP"
      };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
