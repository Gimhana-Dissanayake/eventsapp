import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { Event } from "../../app/models/Event";
import { fetchSampleData } from "./../../app/api/mockApi";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from "./eventConstants";

export const loadEvents = () => {
  return async function (dispatch: any) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: events });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

export const listenToEvents = (events: any) => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  };
};

export const createEvent = (event: Event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

export const updateEvent = (event: Event) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const deleteEvent = (eventId: string) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};
