import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

export const signInWithEmail = (creds: any) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
};

export const registerInFirebase = async (creds: any) => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user?.updateProfile({
      displayName: creds.displayName,
    });
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
};
