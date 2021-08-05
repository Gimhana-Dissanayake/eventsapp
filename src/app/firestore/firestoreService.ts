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
