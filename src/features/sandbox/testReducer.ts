export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

const initialState = {
  data: 42,
};

export const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + 1,
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - 1,
      };

    default:
      return state;
  }
};

export type RootState = ReturnType<typeof testReducer>;
