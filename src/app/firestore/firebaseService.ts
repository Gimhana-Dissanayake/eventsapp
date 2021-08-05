import firebase from "../config/firebase";

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
    return await result.user?.updateProfile({
      displayName: creds.displayName,
    });
  } catch (error) {
    throw error;
  }
};
