import firebase from "../../app/config/firebase";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export const signInUser = (user: any) => {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
};

export function verifyAuth() {
  return function (dispatch: any) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
