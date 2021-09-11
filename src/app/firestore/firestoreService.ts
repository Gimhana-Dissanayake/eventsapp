import cuid from "cuid";
import firebase from "../config/firebase";
import { Event } from "../models/Event";

const db = firebase.firestore();

export const dataFromSnapshot = (snapshot: any) => {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const listenToEventsFromFirestore = () => {
  return db.collection("events").orderBy("date");
};

export const listenToEventFromFirestore = (eventId: any) => {
  return db.collection("events").doc(eventId);
};

export const addEventToFirestore = (event: Event) => {
  return db.collection("events").add({
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
  });
};

export const updateEventInFirestore = (event: Event) => {
  return db.collection("events").doc(event.id).update(event);
};

export const deleteEventInFirestore = (eventId: string) => {
  return db.collection("events").doc(eventId).delete();
};

export function cancelEventToggle(event: any) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export function setUserProfileData(user: any) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export const getUserProfile = (userId: string) => {
  return db.collection("users").doc(userId);
};

export async function updateUserProfile(profile: any) {
  const user = firebase.auth().currentUser;
  try {
    if (user?.displayName !== profile.displayName) {
      await user?.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection("users").doc(user?.uid).update(profile);
  } catch (error: any) {}
}

export async function updateUserProfilePhoto(
  downloadURL: string,
  filename: string
) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("user").doc(user?.uid);

  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data()?.photoURL) {
      await db.collection("users").doc(user?.uid).update({
        photoURL: downloadURL,
      });
      await user?.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db
      .collection("users")
      .doc(user?.uid)
      .collection("photos")
      .add({
        name: filename,
        url: downloadURL,
      });
  } catch (error: any) {
    throw error;
  }
}

export function getUserPhotos(userUid: string) {
  return db.collection("users").doc(userUid).collection("photos");
}
