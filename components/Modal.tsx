"use client";

import { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../contexts/ModalContext";

const Modal: React.FC = () => {
	const { isOpen, content, closeModal } = useContext(ModalContext);

	if (!isOpen) return null;

	// Gestion de la fermeture par clavier (ex : en appuyant sur la touche "Esc")
	const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			closeModal();
		}
	};

	return ReactDOM.createPortal(
		<div
			className="modal-overlay"
			onClick={closeModal}
			onKeyDown={handleOverlayKeyDown} // Ajout de la gestion de l'événement clavier
		>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button
					className="modal-close"
					type="button"
					onClick={closeModal}
					onKeyDown={(e) => e.key === "Enter" && closeModal()} // Ajout d'une interaction clavier pour le bouton
				>
					&times;
				</button>
				{content}
			</div>
		</div>,
		document.getElementById("modal-root") as HTMLElement,
	);
};

export default Modal;
