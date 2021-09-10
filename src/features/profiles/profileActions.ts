import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";

export const listenToCurrentUserProfile = (profile: any) => {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
};
