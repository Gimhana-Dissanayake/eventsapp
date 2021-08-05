import firebase from "../config/firebase";

export const signInWithEmail = (creds: any) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
};
