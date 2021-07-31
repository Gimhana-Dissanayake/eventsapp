import React from "react";
import { useSelector } from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";
import { RootState } from "../../store/rootReducer";

const ModalManager = () => {
  const modalLookup = {
    TestModal,
  };

  const currentModal = useSelector((state: RootState) => state.modals);

  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent: any = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;
