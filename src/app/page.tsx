"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { ModalActionsContext } from "../../contexts/ModalContext";

import { useSectionRefs } from "../../hooks/useSectionRefs";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import { useDesktopAnimations } from "../../hooks/useDesktopAnimations";


import FacebookLiveVideoMobile from "../../components/FacebookLiveVideoMobile";
import HookHomePage from "../../components/HookHomePage/HookHomePage";
import Section1Content from "../../components/Section1Content/Section1Content";
import Section2Content from "../../components/Section2Content/Section2Content";
import Section3Content from "../../components/Section3Content/Section3Content";
import SliderFullWidth from "../../components/SliderFullWidth/SliderFullWidth";
const MasonryGridGalery = dynamic(() => import("../../components/MasonryGridGalery/MasonryGridGalery"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import ReassuranceSection from "../../components/ReassuranceSection";
import { CarouselComments } from "../../components/CarouselComments/CarouselComments";
import CommentForm from "../../components/CarouselComments/CommentForm";
import NewsletterSectionFront from "../../components/NewsletterAdmin/NewsletterSectionFront";
import UnsubscribeModal from "../../components/NewsletterAdmin/UnsubscribeModal";

interface User {
  role?: string;
}

export default function Home() {
  // Récupération des refs depuis le hook
  const { desktopRefs, mobileRefs } = useSectionRefs();

  // Contexte et session
  const [isAdmin, setIsAdmin] = useState(false);
  const { openModal, closeModal } = useContext(ModalActionsContext);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [showMasonry, setShowMasonry] = useState(false);
  const [hasMasonryLoaded, setHasMasonryLoaded] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setIsLoaded(true);
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', onLoad);
    }
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Dès que showMasonry devient true, on le verrouille
  useEffect(() => {
    if (showMasonry && !hasMasonryLoaded) {
      setHasMasonryLoaded(true);
    }
  }, [showMasonry, hasMasonryLoaded]);

  // useScrollEnterAnimation();
  useDesktopAnimations(desktopRefs, setShowMasonry);



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
  const DesktopView = () => (
    <div>
      {/* Section 1 */}
      <section ref={desktopRefs.section1} className="section1">
        <div className="section1-div">
          <HookHomePage />
        </div>
        <Section1Content handleSectionClickPlus={() => console.log("Plus")} />
      </section>

      {/* Section 2 */}
      <section ref={desktopRefs.section2} className="section2">
        <Section2Content />
      </section>

      {/* Section 3 */}
      <section ref={desktopRefs.section3} className="section3">
        <Section3Content />
      </section>

      <section>
        <SliderFullWidth />
      </section>

      {/* Section 4 */}
      <section ref={desktopRefs.section4} className="section4-container">
        <div >{(showMasonry || hasMasonryLoaded) && <MasonryGridGalery />}</div>
        <div ref={desktopRefs.section41} className="reassurance">
          <ReassuranceSection />
        </div>
      </section>

      {isAdmin && (
        <div className=" admin-comment-form">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => openModal(<CommentForm onClose={() => closeModal()} />)}
          >
            Ajouter un Commentaire
          </button>
        </div>
      )}
      <div ref={desktopRefs.section5} className="section6">
        <CarouselComments />
      </div>


      <div ref={desktopRefs.section51} className="section7">
        <NewsletterSectionFront />
      </div>
      
    </div>
  );

  // Rendu pour la version Mobile, en utilisant mobileRefs du hook
  const MobileView = () => (
    <></>
  );

  return <>{!isMobile ? <DesktopView /> : <MobileView />}</>;
}
