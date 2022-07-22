// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { getStorage } from "firebase/storage";
  import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoatwwKfj1wghtvzNEjBWI6iYtxTNbLpI",
  authDomain: "my-plant-app-88bbd.firebaseapp.com",
  projectId: "my-plant-app-88bbd",
  storageBucket: "my-plant-app-88bbd.appspot.com",
  messagingSenderId: "177470338403",
  appId: "1:177470338403:web:4d4a33998b438c13514f56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function SignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
  // return signOut(auth);
}