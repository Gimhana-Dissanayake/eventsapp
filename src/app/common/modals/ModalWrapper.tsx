import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./modalReducer";

interface Props {
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
  header: string;
}

const ModalWrapper: FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={props.size}>
      {props.header && <Modal.Header>{props.header}</Modal.Header>}
      <Modal.Content>{props?.children}</Modal.Content>
    </Modal>
  );
};

export default ModalWrapper;
