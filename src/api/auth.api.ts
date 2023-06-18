import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { notifications } from "@mantine/notifications";
// import { invalidateQueries } from "src/hooks/useRHookUtils";
import { auth, googleProvider } from "src/hooks/useFirebase";

const useSignUpWithEmail = async (email: string, password: string) => {
  notifications.show({
    id: 'logging-spinner',
    title: "Awesome !",
    message: 'Logging in!',
    loading: true,
    autoClose: false,
    color: 'green',
    withBorder: true,
    withCloseButton: false,
  })
  try {
    const signUpResponse = await createUserWithEmailAndPassword(auth, email, password);
    notifications.hide('logging-spinner');
    return signUpResponse;
  } catch (error: any) {
    notifications.hide('logging-spinner')
    let msg = '';
    // Handle the registration error
    if (error.code === 'auth/email-already-in-use') {
      // Email already exists, display appropriate message or take necessary action
      msg = 'Email already in use';
    } else if (error.code === 'auth/weak-password') {
      // Weak password, display appropriate message or take necessary action
      msg = 'Weak password';
    } else {
      // Other registration errors, display a generic error message or handle as needed
      msg = `Registration error: ${error.message}`;
    }

    notifications.show({
      title: 'Error !',
      message: msg,
      color: 'red'
    });
  }
}

const useSignInWithEmail = async (email: string, password: string) => {
  notifications.show({
    id: 'logging-spinner',
    title: "Awesome !",
    message: 'Logging in!',
    loading: true,
    autoClose: false,
    color: 'green',
    withBorder: true,
    withCloseButton: false,
  })
  try {
    const signInResponse = await signInWithEmailAndPassword(auth, email, password);
    notifications.hide('logging-spinner');
    return signInResponse;
  } catch (error: any) {
    notifications.hide('logging-spinner')
    let msg = '';
    // Handle the authentication error
    if (error?.code === 'auth/user-not-found') {
      // User not found, display appropriate message or take necessary action
      msg = 'User not found';
    } else if (error?.code === 'auth/wrong-password') {
      // Incorrect password, display appropriate message or take necessary action
      msg = 'Incorrect password';
    } else {
      // Other authentication errors, display a generic error message or handle as needed
      msg = `Authentication error: ${error.message}`;
    }

    notifications.show({
      title: 'Error !',
      message: msg,
      color: 'red'
    });
    return null;
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
    notifications.show({
      title: "Bye bye !",
      message: 'Loggged out successfully !',
      autoClose: true,
      color: 'green',
      withBorder: true,
      withCloseButton: true,
    });
  } catch (error) {
    console.log('Error: ', error);
    return error;
  }
}

export {
  useSignUpWithEmail,
  useSignInWithEmail,
  useSignInWithGoogle,
  useSignOut
};
