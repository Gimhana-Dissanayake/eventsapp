import firebase from "../../app/config/firebase";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export const signInUser = (creds: any) => {
  return async function (dispatch: any) {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      dispatch({ type: SIGN_IN_USER, payload: result.user });
    } catch (error) {
      throw error;
    }
  };
};

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
