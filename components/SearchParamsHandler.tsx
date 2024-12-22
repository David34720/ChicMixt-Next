"use client";
import { useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { ModalContext } from "../contexts/ModalContext";
import UnsubscribeModal from "./UnsubscribeModal";

export default function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    const showUnsubscribeModal = searchParams?.get("showUnsubscribeModal");
    if (showUnsubscribeModal === "true") {
      openModal(<UnsubscribeModal onClose={closeModal} />);

      // Supprimer le paramètre de l'URL
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      newSearchParams.delete("showUnsubscribeModal");
      const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams, openModal, closeModal]);

  return null; // Ce composant ne rend rien
}
