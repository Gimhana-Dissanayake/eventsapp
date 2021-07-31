const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export const increment = (amount: number) => {
  return {
    type: INCREMENT_COUNTER,
    payload: amount,
  };
};

export const decrement = (amount: number) => {
  return {
    type: DECREMENT_COUNTER,
    payload: amount,
  };
};

const initialState = {
  data: 42,
};

export const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };

    default:
      return state;
  }
};
