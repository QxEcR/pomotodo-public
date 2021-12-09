import firebase from "firebase/compat/app"
import 'firebase/compat/database'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import "firebase/database"

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  databaseURL: "databaseURL"
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