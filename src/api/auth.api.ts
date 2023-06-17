import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "hooks/useFirebase";

const useGetAuthStat = () => {
  const user = auth.currentUser;
  return user
};

const useSignUpWithEmail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
}

const useSignInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error: ", error)
    return error;
  }
}

const useSignInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.log('Error: ', error)
    return error;
  }
}

const useSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log('Error: ', error);
    return error;
  }
}

export {
  useGetAuthStat,
  useSignUpWithEmail,
  useSignInWithEmail,
  useSignInWithGoogle,
  useSignOut
};
