// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAACekHPXXoLWtD3xbM6jZzQuPy0zBGRXw",
    authDomain: "video-bcf80.firebaseapp.com",
    projectId: "video-bcf80",
    storageBucket: "video-bcf80.appspot.com",
    messagingSenderId: "293896954939",
    appId: "1:293896954939:web:bcd0e806ede42df650281e",
    measurementId: "G-C3VH3KB3TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app