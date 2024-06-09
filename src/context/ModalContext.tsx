"use client";

import React from "react";
import { createContext, useState } from "react";

type ModalProps = {
  show: boolean;
  set: (show: boolean) => void;
  data?: any;
};

type ModalContextType = {
  castModal: ModalProps;
};

const ModalContext = createContext<ModalContextType>({
  castModal: { show: false, set: () => {} },
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [castModal, setCastModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        castModal: { show: castModal, set: setCastModal },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalContext, ModalProvider };
