import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { RootState } from "../../app/store/rootReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

const Sandbox = () => {
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.test.data);

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
      <Button
        onClick={() => {
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }));
        }}
        content="Open Modal"
        color="teal"
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput />
        <TestMap />
      </div>
    </>
  );
};

export default Sandbox;
