import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { RootState } from "../../app/store/rootReducer";
import { decrement, increment } from "./testReducer";

const Sandbox = () => {
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.test.data);

  const { loading } = useSelector((state: RootState) => state.async);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {`${data}`}</h3>
      <Button
        loading={loading}
        onClick={() => {
          dispatch(increment(20));
        }}
        content="Increment"
        color="green"
      />
      <Button
        loading={loading}
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
    </>
  );
};

export default Sandbox;
