"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { ModalActionsContext } from "../../contexts/ModalContext";


import FacebookLiveVideoMobile from "../../components/Section2Content/FacebookLiveVideoMobile";
import HookHomePage from "../../components/HookHomePage/HookHomePage";
import Section1Content from "../../components/Section1Content/Section1Content";
import Section2Content from "../../components/Section2Content/Section2Content";
import Section3Content from "../../components/Section3Content/Section3Content";
import SliderFullWidth from "../../components/SliderFullWidth/SliderFullWidth";
import MasonryGridLoader from "../../components/MasonryGridGalery/MasonryGridLoader";
import ReassuranceSection from "../../components/ReassuranceSection/ReassuranceSection";
import { CarouselComments } from "../../components/CarouselComments/CarouselComments";
import CommentForm from "../../components/CarouselComments/CommentForm";
import NewsletterSectionFront from "../../components/NewsletterAdmin/NewsletterSectionFront";
import UnsubscribeModal from "../../components/NewsletterAdmin/UnsubscribeModal";

interface User {
  role?: string; 
}

export default function Home() {
  // Récupération des refs depuis le hook
  

  // Contexte et session
  const [isAdmin, setIsAdmin] = useState(false);
  const { openModal, closeModal } = useContext(ModalActionsContext);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  
  // Gestion de la modale
  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  // Gestion du paramètre dans l'URL
  useEffect(() => {
    const showUnsubscribeModal = searchParams?.get("showUnsubscribeModal");
    if (showUnsubscribeModal === "true") {
      openModal(<UnsubscribeModal onClose={handleCloseModal} />);
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      newSearchParams.delete("showUnsubscribeModal");
      const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams, openModal, handleCloseModal]);

  // Vérification du rôle admin
  useEffect(() => {
    if (session?.user && (session.user as User).role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  // Détection mobile / desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rendu pour la version Desktop
  const DesktopView = () => {
    const handleSectionClickPlus = () => {
      window.scrollBy({
        top: window.innerHeight - 100, // Descend d'une hauteur d'écran
        left: 0,
        behavior: "smooth",
      });
    };

    return (
      <div>
        {/* Section 1 */}
        <section className="section1">
          <div className="section1-div">
            <HookHomePage />
          </div>
          <Section1Content isMobile={isMobile} handleSectionClickPlus={handleSectionClickPlus} />
        </section>

        {/* Section 2 */}
        <section className="section2">
          <Section2Content isMobile={false} />
        </section>

        {/* Section 3 */}
        <section className="section3">
          <Section3Content />
        </section>

        <section className="slider-container">
          <SliderFullWidth />
        </section>

        {/* Section 4 */}
        <section className="section4-container">
          <div className="section4-masonry">
            <MasonryGridLoader />
          </div>
          <div className="reassurance">
            <ReassuranceSection />
          </div>
        </section>

        {isAdmin && (
          <div className="admin-comment-form">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() =>
                openModal(<CommentForm onClose={() => closeModal()} />)
              }
            >
              Ajouter un Commentaire
            </button>
          </div>
        )}
        <div className="section6">
          <CarouselComments />
        </div>

        <div className="section7">
          <NewsletterSectionFront />
        </div>
      </div>
    );
  };

  // Rendu pour la version Mobile, en utilisant mobileRefs du hook
  const MobileView = () => {
    const handleSectionClickPlus = () => {
      window.scrollBy({
        top: window.innerHeight - 100, // Descend d'une hauteur d'écran - 100px
        left: 0,
        behavior: "smooth",
      });
    };

    return (
      <>
        <div>
          {/* Section 1 */}
          <section className="section1">
            <HookHomePage />
            <Section1Content isMobile={isMobile} handleSectionClickPlus={handleSectionClickPlus} />
          </section>

          {/* Section 2 */}
          <section className="mobile-section2">
            <Section2Content isMobile />
          </section>

          {/* Section 3 */}
          <section className="mobile-section3">
            <Section3Content />
          </section>

          {/* Slider / Galerie */}
          <section className="slider-container">
            <SliderFullWidth />
          </section>

          {/* Section Reassurance */}
          <section className="section4">
            <div>
             <MasonryGridLoader />
            </div>
          </section>

          <section className="section4-reassurance">
            <ReassuranceSection />
          </section>

          {/* Section Carousel des commentaires */}
          <section className="mobile-section5">
            <CarouselComments />
          </section>

          {/* Section Newsletter */}
          <section className="mobile-section7">
            <NewsletterSectionFront />
          </section>
        </div>
      </>
    );
  };

  return <>{!isMobile ? <DesktopView /> : <MobileView />}</>;
}
