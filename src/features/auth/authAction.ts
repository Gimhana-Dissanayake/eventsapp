import { APP_LOADED } from "../../app/async/asyncReducer";
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
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
