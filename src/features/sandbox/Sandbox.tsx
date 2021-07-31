import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./testReducer";

const Sandbox = () => {
  const data = useSelector((state: RootState) => state.data);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {`${data}`}</h3>
    </>
  );
};

export default Sandbox;
