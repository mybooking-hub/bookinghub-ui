// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from 'firebase/storage';

import firebaseConfig from "config/firebase.config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firebaseDB = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export const useFirebase = () => {
  const storageRef = (sRef: string) => {
    return ref(storage, sRef);
  }

  return {
    storageRef
  };
};