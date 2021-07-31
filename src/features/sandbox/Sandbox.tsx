import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { decrement, increment, RootState } from "./testReducer";

const Sandbox = () => {
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.data);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {`${data}`}</h3>
      <Button
        onClick={() => {
          dispatch(increment(20));
        }}
        content="Increment"
        color="green"
      />
      <Button
        onClick={() => {
          dispatch(decrement(10));
        }}
        content="Decrement"
        color="red"
      />
    </>
  );
};

export default Sandbox;
