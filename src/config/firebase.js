import firebase from "firebase/compat/app"
import 'firebase/compat/database'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyC8IjwyrS4KzFmY3IydIAhr7ifri0fHEYY",
  authDomain: "pomotodo-329d6.firebaseapp.com",
  projectId: "pomotodo-329d6",
  storageBucket: "pomotodo-329d6.appspot.com",
  messagingSenderId: "1034607799434",
  appId: "1:1034607799434:web:4a379afdb9fd726ce81173",
  databaseURL: "https://pomotodo-329d6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = firebase.initializeApp(firebaseConfig);
export const database = firebase.database()
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const signInGoogle = () => {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    localStorage.setItem("POMOTODO-USER-UID", result.user.uid)
    localStorage.setItem("POMOTODO-USER-NAME", result.user.displayName)
  })
  .catch(error => {
      
  })
}