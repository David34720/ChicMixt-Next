// ModalContext.tsx
"use client";
import { createContext, useState, useCallback, useMemo } from "react";
import type { FC, ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  content: ReactNode;
}

interface ModalActions {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const ModalStateContext = createContext<ModalState>({
  isOpen: false,
  content: null,
});

export const ModalActionsContext = createContext<ModalActions>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  const modalState = useMemo(() => ({ isOpen, content }), [isOpen, content]);
  const modalActions = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalActionsContext.Provider value={modalActions}>
        {children}
      </ModalActionsContext.Provider>
    </ModalStateContext.Provider>
  );
};
