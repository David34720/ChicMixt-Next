// ModalContext.tsx
"use client";
import type { FC, ReactNode } from "react";

import { createContext, useState } from "react";

interface ModalContextProps {
	isOpen: boolean;
	content: ReactNode;
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
	isOpen: false,
	content: null,
	openModal: () => {},
	closeModal: () => {},
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState<ReactNode>(null);

	const openModal = (modalContent: ReactNode) => {
		setContent(modalContent);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setContent(null);
	};

	return (
		<ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};
