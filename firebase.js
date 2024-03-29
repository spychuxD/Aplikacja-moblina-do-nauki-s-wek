// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// Other libraries might need to also be prefixed with "compat":
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALfRHPocPyz9ww7cLdG6EqO1MwC2TQORk",
  authDomain: "projektapki.firebaseapp.com",
  projectId: "projektapki",
  storageBucket: "projektapki.appspot.com",
  messagingSenderId: "513927850923",
  appId: "1:513927850923:web:0519eced9c4a36e33a00ee"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore();
//const st = getStorage(app);
const st = firebase.storage();
export { auth, db, st};
