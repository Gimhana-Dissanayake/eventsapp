import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";
import TestModal from "../../../features/sandbox/TestModal";
import { RootState } from "../../store/rootReducer";

const ModalManager = () => {
  const modalLookup: any = {
    TestModal,
    LoginForm,
    RegisterForm,
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
