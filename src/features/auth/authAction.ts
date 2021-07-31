import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

const signInUser = (payload: any) => {
  return {
    type: SIGN_IN_USER,
    payload,
  };
};

const signOutUser = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
