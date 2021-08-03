import { Event } from "./../../app/models/Event";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from "./eventConstants";

interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [],
};

export const eventReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };

    case FETCH_EVENTS:
      return {
        ...state,
        events: payload,
      };

    default:
      return state;
  }
};
