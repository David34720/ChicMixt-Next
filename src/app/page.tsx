"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSectionRefs } from "../../hooks/useSectionRefs";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import { useDesktopAnimations } from "../../hooks/useDesktopAnimations";
import { useSectionContext } from "../../components/AppWrapper";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ModalContext } from "../../contexts/ModalContext";
import { FcCalendar } from "react-icons/fc";

import FacebookLiveVideoMobile from "../../components/FacebookLiveVideoMobile";
const MasonryGridGallery = dynamic(() => import("../../components/MasonGridGalerry"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import HookHomePage from "../../components/HookHomePage/HookHomePage";
import Section1Content from "../../components/Section1Content/Section1Content";
import Section2Content from "../../components/Section2Content/Section2Content";
import ReassuranceSection from "../../components/ReassuranceSection";
import { CarouselComments } from "../../components/CarouselComments";
import CommentForm from "../../components/CommentForm";
import SubscriberForm from "../../components/SubscriberForm";
import UnsubscribeModal from "../../components/UnsubscribeModal";

interface User {
  role?: string;
}

export default function Home() {
  // Récupération des refs depuis le hook
  const { desktopRefs, mobileRefs } = useSectionRefs();

  // Contexte et session
  const { openModal, closeModal } = useContext(ModalContext);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [showMasonry, setShowMasonry] = useState(false);

  // Appel des hooks d'animation
  useScrollEnterAnimation();
  useDesktopAnimations(desktopRefs, setShowMasonry);
 
  // Pour la version desktop, on utilise les refs centralisées

  const [isAdmin, setIsAdmin] = useState(false);

  // Gestion de la modale
  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleUnsubscribeModal = () => {
    openModal(<UnsubscribeModal onClose={handleCloseModal} />);
  };

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
        <div ref={desktopRefs.section3Title1} className="section3-left">
          <div className="info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="section3-title">
              ✨ Des lundis soirs remplis de soleil et de bonne humeur !
            </h2>
            <p className="section3-text">
              <strong>Rejoignez-nous pour des lives pleins de joie et de fous rires.</strong>
              <br />
              Venez vous détendre avec Chic'Mixt et découvrez notre collection à tout petit prix !
            </p>
            <p className="section3-text">
              <strong>Comment Participer : </strong>
              Suivez-nous sur{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61555657774462"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Facebook
              </a>{" "}
              et activez les notifications pour ne rien manquer.
            </p>
            <div className="section3-text">
              <strong>Nos Collections :</strong>
              <ul className="collection-list">
                <li>Nouveautés Mode : Restez à la pointe de la mode avec nos dernières arrivées.</li>
                <li>Vêtements Femme : Robes, tops, pantalons pour sublimer votre style.</li>
                <li>Vêtements Homme : Un look moderne et élégant.</li>
                <li>Vêtements Enfants : Pour les enfants de 0 à 12 ans.</li>
                <li>Accessoires de Mode : Sacs, bijoux, écharpes pour parfaire votre tenue.</li>
              </ul>
            </div>
          </div>
          <div className="cta-area">
            <p className="section3-text-cta">Prochain Live : lundi 20h30 !</p>
            <a className="calendar-link" href="/calendrier.ics" download>
              <span className="calendar-icon-wrapper">
                <FcCalendar className="calendar-icon" />
              </span>
              Ajouter à mon calendrier
            </a>
          </div>
        </div>
        <div
          className="section3-right"
          style={{ backgroundImage: "url('/images/hook2/hook2-2.png')" }}
        ></div>
      </section>

      {/* Section 4 */}
      <section ref={desktopRefs.section4}>
        <div className="section4">{showMasonry && <MasonryGridGallery />}</div>
        <div ref={desktopRefs.section41} className="reassurance">
          <ReassuranceSection />
        </div>
      </section>

      <div ref={desktopRefs.section5} className="section6">
        <CarouselComments />
      </div>

      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Ajouter un Commentaire</h2>
          <CommentForm />
        </div>
      )}

      <div ref={desktopRefs.section51} className="section7">
        <div className="section7-left">
          <Image
            src="/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png"
            alt="Meilleure boutique de mode en ligne"
            width={400}
            height={400}
            quality={80}
            loading="lazy"
          />
        </div>
        <div className="section7-right">
          <SubscriberForm />
          <p
            style={{ cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }}
            onClick={handleUnsubscribeModal}
          >
            Se désabonner de la newsletter
          </p>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </div>
  );

  // Rendu pour la version Mobile, en utilisant mobileRefs du hook
  const MobileView = () => (
    <div ref={mobileRefs.animationM}>
      {/* Section 1 */}
      <section ref={mobileRefs.section1M} className="section1">
        <div className="section1-div">
          <Image
            src="/images/s-boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34-2.jpg"
            alt="Live shopping Facebook Mode pas chère en ligne"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            loading="lazy"
          />
        </div>
        <div ref={mobileRefs.section1Content} className="section1-content font-aboreto">
          <h1 className="section1-title tracking-wide">Bienvenue sur Chic'Mixt</h1>
          <div className="content-hook">
            <div className="section1-left">
              <p className="section1-description" style={{ color: "#de277b" }}>
                Live shopping tous les lundis à partir de 20h30
              </p>
              <p className="section1-description">
                Plongez dans l'univers de la mode tendance avec notre boutique de vêtements en live.
              </p>
            </div>
            <div className="section1-right">
              <p style={{ width: "100%" }} className="section1-description">
                Nous proposons une large sélection de vêtements femme, homme, enfant et accessoires de mode pour tous les styles et toutes les occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section ref={mobileRefs.section2M} className="section2M">
        <div className="section2M-facebook enter-animation" ref={mobileRefs.imageRef1M}>
          <FacebookLiveVideoMobile />
        </div>
        <div className="section2M-content">
          <div className="content-box" ref={mobileRefs.contentBoxM}>
            <a
              href="https://www.facebook.com/profile.php?id=61555657774462"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="logo-fb-container" ref={mobileRefs.imageRefFB}>
                <Image
                  className="logo-fb-img"
                  src="/images/Facebook-logo-chicMixt.jpeg"
                  alt="Facebook Vêtements en ligne Live Chic'mixt"
                  width={80}
                  height={80}
                  loading="lazy"
                />
                <h1 className="enter-animation" ref={mobileRefs.section2MTitle1}>
                  RETROUVEZ-NOUS EN LIVE SUR FACEBOOK
                </h1>
              </div>
            </a>
            <p className="enter-animation">
              Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d’offres spéciales.
            </p>
          </div>
          <div className="share">
            <span className="share-text enter-animation">
              Partagez à vos amis et profitez des bons plans Mode Chic'Mixt sur vos réseaux préférés !
            </span>
            <ReactShare iconSize={40} />
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section ref={mobileRefs.section3M} className="section3M">
        <div className="info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow section3M-content enter-animation">
          <h2 className="section3-title">
            ✨ Vente de vêtements et accessoires en Direct tous les lundis soir ✨
          </h2>
          <p className="section3-text enter-animation" ref={mobileRefs.section3Ma}>
            <strong>Rejoignez-nous pour des lives pleins de joie et de fous rires.</strong>
            <br />
            Venez vous détendre avec Chic'Mixt et découvrez notre collection à tout petit prix !
          </p>
          <p className="section3-text enter-animation">
            <strong>Comment Participer : </strong>
            <br />
            Suivez-nous sur{" "}
            <a
              href="https://www.facebook.com/profile.php?id=61555657774462"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Facebook
            </a>{" "}
            et activez les notifications pour ne rien manquer.
          </p>
          <div className="section3-text enter-animation">
            <span>
              <strong>Nos Collections :</strong>
            </span>
            <ul className="collection-list">
              <li className="enter-animation">
                Nouveautés Mode : Restez à la pointe de la mode avec nos dernières arrivées.
              </li>
              <li className="enter-animation">
                Vêtements Femme : Robes, tops, pantalons pour sublimer votre style.
              </li>
              <li className="enter-animation">
                Vêtements Homme : Un look moderne et élégant.
              </li>
              <li className="enter-animation">
                Vêtements Enfants : Pour les enfants de 0 à 12 ans.
              </li>
              <li className="enter-animation">
                Accessoires de Mode : Sacs, bijoux, écharpes pour parfaire votre tenue.
              </li>
            </ul>
          </div>
          <div className="cta-area">
            <p className="section3-text-cta enter-animation">Prochain Live : lundi 20h30 !</p>
            <a className="calendar-link enter-animation" href="/calendrier.ics" download>
              <span className="calendar-icon-wrapper">
                <FcCalendar className="calendar-icon" />
              </span>
              Ajouter à mon calendrier
            </a>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section ref={mobileRefs.section4M}>
        <div className="section4M">
          {showMasonry && <MasonryGridGallery />}
        </div>
        <div ref={mobileRefs.section41M} className="reassurance mt-12 enter-animation">
          <ReassuranceSection />
        </div>
      </section>

      <div ref={mobileRefs.section5M} className="section5M enter-animation">
        <CarouselComments />
      </div>

      <div ref={mobileRefs.section51M} className="section51M">
        <div className="section51M-left">
          <Image
            src="/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png"
            alt="Meilleure boutique de mode en ligne"
            width={80}
            height={80}
            quality={80}
            loading="lazy"
          />
        </div>
        <div className="section51M-right enter-animation">
          <SubscriberForm />
          <p
            style={{ cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }}
            onClick={handleUnsubscribeModal}
          >
            Se désabonner de la newsletter
          </p>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </div>
  );

  return <>{!isMobile ? <DesktopView /> : <MobileView />}</>;
}
