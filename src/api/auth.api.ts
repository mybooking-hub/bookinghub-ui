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
    notifications.show({
      title: `Welcome to the My Seatings platform, ${signUpResponse.user.displayName ?? signUpResponse.user.email} ! 🥳`,
      message: 'You can start navigating around our platform for watch for performance and ticket booking 😇',
      withBorder: true,
    })
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
    notifications.show({
      title: `Welcome back to the My Seatings platform, ${signInResponse.user.displayName ?? signInResponse.user.email} ! 🥳`,
      message: 'You can start navigating around our platform for watch for performance and ticket booking 😇',
      withBorder: true,
    })
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
    const signInResponse = await signInWithPopup(auth, googleProvider);
    notifications.show({
      title: `Welcome to the My Seatings platform, ${signInResponse.user.displayName ?? signInResponse.user.email} ! 🥳`,
      message: 'You can start navigating around our platform for watch for performance and ticket booking 😇',
      withBorder: true,
      color: "green",
    })
    return signInResponse;
  } catch (error: any) {
    let msg = '';
    // Handle the registration error
    if (error?.code === 'auth/account-exists-with-different-credential') {
      // User already registered with a different provider, display appropriate message or take necessary action
      msg = 'User already registered with a different provider';
    } else {
      // Other registration errors, display a generic error message or handle as needed
      msg = `Registration error:', ${error.message}`;
    }

    notifications.show({
      title: 'Error !',
      message: msg,
      color: 'red'
    });
    return null;
  }
}

const useSignOut = async () => {
  try {
    await signOut(auth);
    notifications.show({
      title: "Bye bye !",
      message: 'Hope we will get to see you soon 😢. Loggged out successfully !',
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
