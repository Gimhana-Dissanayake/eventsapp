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

export const listenToEventsFromFirestore = (predicate: any) => {
  const user = firebase.auth().currentUser;
  let eventsRef = db.collection("events").orderBy("date");
  switch (predicate.get("filter")) {
    case "isGoing":
      return eventsRef
        .where("attendeeIds", "array-contains", user?.uid)
        .where("date", ">=", predicate.get("startDate"));
    case "isHost":
      return eventsRef
        .where("hostUid", "==", user?.uid)
        .where("date", ">=", predicate.get("startDate"));
    default:
      return eventsRef.where("date", ">=", predicate.get("startDate"));
  }
};

export const listenToEventFromFirestore = (eventId: any) => {
  return db.collection("events").doc(eventId);
};

export const addEventToFirestore = (event: Event) => {
  const user = firebase.auth().currentUser;

  return db.collection("events").add({
    ...event,
    hostUid: user?.uid,
    hostedBy: user?.displayName,
    hostPhotoURL: user?.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user?.uid),
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

export async function setMainPhoto(photo: any) {
  const user = firebase.auth().currentUser;
  try {
    await db.collection("users").doc(user?.uid).update({
      photoURL: photo.url,
    });
    return await user?.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

export function deletePhotoFromCollection(photoId: string) {
  const userUid = firebase.auth().currentUser?.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

export function addUserAttendance(event: any) {
  const user = firebase.auth().currentUser;
  return db
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user?.uid),
    });
}

export async function cancelUserAttendance(event: any) {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection("events").doc(event.id).get();
    return db
      .collection("events")
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user?.uid),
        attendees: eventDoc
          .data()
          ?.attendees.filter((attendee: any) => attendee.id !== user?.uid),
      });
  } catch (error: any) {}
}

export function getUserEventsQuery(activeTab: any, userUid: any) {
  let eventsRef = db.collection("events");
  const today = new Date();

  switch (activeTab) {
    case 1:
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .where("date", "<=", today)
        .orderBy("date", "desc");
    case 2:
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");
    default:
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .where("date", ">=", today)
        .orderBy("date");
  }
}
