import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_PHOTOS,
} from "./profileConstants";

export const listenToCurrentUserProfile = (profile: any) => {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
};

export const listenToSelectedUserProfile = (profile: any) => {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
};

export function listenToUserPhotos(photos: any) {
  return {
    type: LISTEN_TO_USER_PHOTOS,
    payload: photos,
  };
}
