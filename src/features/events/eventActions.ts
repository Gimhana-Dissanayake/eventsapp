import { Event } from "../../app/models/Event";
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./eventConstants";

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
    payload: event,
  };
};
