// Import the functions you need require(the SDKs you need
const initializeApp = require("firebase/app").initializeApp;
const getAuth = require("firebase/auth").getAuth;
const getFirestore = require("firebase/firestore").getFirestore;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeTiMGAS5H_4Qk0RvYTPVdLMFSf-oUB-A",
  authDomain: "routsapp-f5f9a.firebaseapp.com",
  projectId: "routsapp-f5f9a",
  storageBucket: "routsapp-f5f9a.appspot.com",
  messagingSenderId: "813945693993",
  appId: "1:813945693993:web:4349b2857d16067967b938",
  measurementId: "G-CDPYYY5233"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
exports.app = app;
exports.auth = getAuth(app);
exports.db = getFirestore(app);



