const initialState = {
  data: 42,
};

export const testReducer = (state = initialState) => {
  return state;
};

export type RootState = ReturnType<typeof testReducer>;
