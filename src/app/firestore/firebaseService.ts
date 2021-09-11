import { toast } from "react-toastify";
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

export async function socialLogin(selectedProvider: any) {
  let provider: any;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    if (result.additionalUserInfo?.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}

export function updateUserPassword(creds: any) {
  const user = firebase.auth().currentUser;
  return user?.updatePassword(creds.newPassword1);
}

export function uploadToFirebaseStorage(file: any, filename: any) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user?.uid}/user_images/${filename}`).put(file);
}

export function deleteFromFirebaseStorage(filename: any) {
  const userUid = firebase.auth().currentUser?.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();
}
