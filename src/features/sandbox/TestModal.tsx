import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";

interface Props {
  data: any;
}

const TestModal = (props: Props) => {
  return (
    <ModalWrapper size="mini" header="Test Modal">
      <div>The data is: {props.data}</div>
    </ModalWrapper>
  );
};

export default TestModal;
