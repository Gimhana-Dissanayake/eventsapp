import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "crown-db-e4263.firebaseapp.com",
  databaseURL: "https://crown-db-e4263.firebaseio.com",
  projectId: "crown-db-e4263",
  storageBucket: "crown-db-e4263.appspot.com",
  messagingSenderId: "7255313719",
  appId: "1:7255313719:web:fe1de8593f9766b3ef5eb2",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
