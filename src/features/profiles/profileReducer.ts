import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";

const initialState = {
  currentUserProfile: null,
};

const profileReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };
    default: {
      return state;
    }
  }
};

export default profileReducer;
