import firebase from "../config/firebase";

const db = firebase.firestore();

export const getEventsFromFirestore = (observer: any) => {
  return db.collection("events").onSnapshot(observer);
};
