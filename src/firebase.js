// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbC9xmBlxiUEcsiXV4mh5n1_dgrsBfCG0",
    authDomain: "weather-app-be7a5.firebaseapp.com",
    projectId: "weather-app-be7a5",
    storageBucket: "weather-app-be7a5.appspot.com",
    messagingSenderId: "107232082737",
    appId: "1:107232082737:web:408d6c48508d6ba92d0e10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)