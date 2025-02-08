// Modal.tsx
"use client";
import styles from "./Modal.module.scss";
import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalStateContext, ModalActionsContext } from "../../contexts/ModalContext";

const Modal: React.FC = () => {
  const { isOpen, content } = useContext(ModalStateContext);
  const { closeModal } = useContext(ModalActionsContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  if (!isOpen) return null;

  const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      onClick={closeModal}
      onKeyDown={handleOverlayKeyDown}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modalClose}
          type="button"
          onClick={closeModal}
          onKeyDown={(e) => e.key === "Enter" && closeModal()}
        >
          &times;
        </button>
        {content}
      </div>
    </div>,
    modalRoot as HTMLElement
  );
};

export default Modal;
