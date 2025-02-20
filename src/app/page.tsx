"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { ModalActionsContext } from "../../contexts/ModalContext";


import FacebookLiveVideoMobile from "../../components/Section2Content/FacebookLiveVideoMobile";
import HookHomePage from "../../components/HookHomePage/HookHomePage";
import Section1Content from "../../components/Section1Content/Section1Content";
import Section2Content from "../../components/Section2Content/Section2Content";
import Section3Content from "../../components/Section3Content/Section3Content";
import ImageFullWidth from "../../components/ImageFullWidth/ImageFullWidth";
import MasonryGridGalery from "../../components/MasonryGridGalery/MasonryGridGalery";
import ReassuranceSection from "../../components/ReassuranceSection/ReassuranceSection";
import { CarouselComments } from "../../components/CarouselComments/CarouselComments";
import CommentForm from "../../components/CarouselComments/CommentForm";
import NewsletterSectionFront from "../../components/Admin/NewsletterSectionFront";
import UnsubscribeModal from "../../components/Admin/UnsubscribeModal";

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

  const [facebookVideoUrl, setFacebookVideoUrl] = useState<string>("https://www.facebook.com/61555657774462/videos/605342502287782/");
  const [liveDate, setLiveDate] = useState<string>("");
  
  
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

// Récupération des données
  useEffect(() => {
    const fetchLive = async () => {
      try {
        const response = await fetch("/api/section2");
        const data = await response.json();

        if (typeof data === "object" && data !== null) {
          const { videoUrl, liveDate } = data;
          if (videoUrl && liveDate) {
            setFacebookVideoUrl(videoUrl);
            setLiveDate(new Date(liveDate).toLocaleDateString("fr-FR"));
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchLive();
  }, []);

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
          <Section2Content facebookVideoUrl={facebookVideoUrl} liveDate={liveDate} isMobile={isMobile} isAdmin={isAdmin}/>
        </section>

        {/* Section 3 */}
        <section className="section3">
          <Section3Content />
        </section>

        <section className="slider-container">
          <ImageFullWidth />
          {/* <SliderFullWidth /> */}
        </section>

        {/* Section 4 */}
        <section className="section4-container">
          <div className="section4-masonry">
            <MasonryGridGalery />
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
            <Section2Content isMobile={isMobile} isAdmin={isAdmin} facebookVideoUrl={facebookVideoUrl} liveDate={liveDate}/>
          </section>

          {/* Section 3 */}
          <section className="mobile-section3">
            <Section3Content />
          </section>

          {/* Slider / Galerie */}
          <section className="slider-container">
            <ImageFullWidth />
          </section>

          {/* Section Reassurance */}
          <section className="section4">
            <div>
             <MasonryGridGalery />
            </div>
          </section>

          <section className="section4-reassurance">
            <ReassuranceSection />
          </section>

          {/* Section Carousel des commentaires */}
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
