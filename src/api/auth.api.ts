import { useQuery } from "@tanstack/react-query";
import { SignInMethod, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "hooks/useFirebase";

import { notifications } from "@mantine/notifications";
import { queryClient } from "src/main";

const useGetAuthStat = () => {
  return auth.currentUser;
  // return useQuery({
  //   queryKey: ["getUserAuth"],
  //   queryFn: () => new Promise((res, rej) => {
  //     if (auth.currentUser) {
  //       res(auth.currentUser)
  //     } else {
  //       const error = new Error("Error getting user auth stat !")
  //       rej(error)
  //     }
  //   }),
  //   refetchOnWindowFocus: false,
  //   // enabled: false
  // })
};

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
    const signInResponse = await createUserWithEmailAndPassword(auth, email, password);
    notifications.hide('logging-spinner');
    console.log('Register response: ', signInResponse);
    // queryClient.setQueryData(["getUserAuth"], null);
    // queryClient.invalidateQueries({ queryKey: ["getUserAuth"] });
    useGetAuthStat();
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
    console.log('Sign in response: ', signInResponse);
    // queryClient.setQueryData(["getUserAuth"], null);
    // queryClient.invalidateQueries({ queryKey: ["getUserAuth"] });
    useGetAuthStat();
    return true;
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
    return false;
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

    // queryClient.setQueryData(["getUserAuth"], null);
    // queryClient.invalidateQueries({ queryKey: ["getUserAuth"] });
    useGetAuthStat();
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
