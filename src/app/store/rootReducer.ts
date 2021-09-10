import { combineReducers } from "redux";
import { authReducer } from "../../features/auth/authReducer";
import { eventReducer } from "../../features/events/eventReducer";
import profileReducer from "../../features/profiles/profileReducer";
import asyncReducer from "../async/asyncReducer";
import { testReducer } from "./../../features/sandbox/testReducer";
import { modalReducer } from "./../common/modals/modalReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: profileReducer,
});

export default rootReducer;

export type RootState = ReturnType<any>;
