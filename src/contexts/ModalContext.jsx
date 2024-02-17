/* eslint-disable react/prop-types */
import React from "react";

export const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("create");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, toggleModal, actionType, setActionType }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
