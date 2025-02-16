// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkspGlMiZvdxpfHlv6bztgKgHuQtXYl0g",
    authDomain: "wireframe-6a8c1.firebaseapp.com",
    projectId: "wireframe-6a8c1",
    storageBucket: "wireframe-6a8c1.firebasestorage.app",
    messagingSenderId: "863303047922",
    appId: "1:863303047922:web:f6734a6b4ed52655370e6b",
    measurementId: "G-Y3BS63J8KR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app)
// const analytics = getAnalytics(app);