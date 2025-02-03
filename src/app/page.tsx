"use client";
import { useEffect, useRef, useState, useContext, useMemo, useCallback } from "react";
import dynamic from 'next/dynamic'
import { useSession } from "next-auth/react";
import { useSectionContext } from "../../components/AppWrapper";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ModalContext } from "../../contexts/ModalContext";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FcCalendar } from "react-icons/fc";
import { RiScrollToBottomLine } from "react-icons/ri";
import FacebookLiveVideo from "../../components/FacebookLiveVideo";
import FacebookLiveVideoMobile from "../../components/FacebookLiveVideoMobile";
import { ReactShare } from "../../components/ReactShare";
const MasonryGridGallery = dynamic(() => import('../../components/MasonGridGalerry'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
import ReassuranceSection from "../../components/ReassuranceSection";
import { CarouselComments } from "../../components/CarouselComments";
import CommentForm from "../../components/CommentForm";  // Ajout du formulaire de commentaires
import SubscriberForm from "../../components/SubscriberForm";
import UnsubscribeModal from "../../components/UnsubscribeModal";


interface User {
  role?: string;
}


// Fonction d'easing élastique, inspirée d'easings.net (easeOutElastic)
// const easedProgress = easeOutElastic(progress);
function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3.5;
  return t === 0
    ? 0
    : t === 1
      ? 1
      : Math.pow(2, -8 * t) * Math.sin((t * 4 - 0.75) * c4) + 1;
}
function smoothScrollTo(element: HTMLElement, duration = 1000) {
  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + start - 120;
  const distance = end - start;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Application de l'easing élastique sur la progression
    const easedProgress = easeOutElastic(progress);

    window.scrollTo(0, start + distance * easedProgress);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

export default function Home() {
  const { openModal, closeModal } = useContext(ModalContext);
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false); // État pour vérifier si l'utilisateur est un admin
  const { data: session } = useSession(); // Obtenir les informations de session
  const { setSectionRef } = useSectionContext();
  const [showMasonry, setShowMasonry] = useState(false); 

  const section1 = useRef<HTMLDivElement>(null);
  const section1Content = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const section4 = useRef<HTMLDivElement>(null);
  const section41 = useRef<HTMLDivElement>(null);
  const section5 = useRef<HTMLDivElement>(null);
  const section51 = useRef<HTMLDivElement>(null);
  const imageRefFB = useRef<HTMLDivElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null); // Référence pour l'image animée
  const contentBox = useRef(null);
  const section2Title1 = useRef<HTMLDivElement>(null);
  const section3Title1 = useRef<HTMLDivElement>(null);

// ref Mobile
  const animationM = useRef<HTMLDivElement>(null);
  const section1M = useRef<HTMLDivElement>(null);
  const section2M = useRef<HTMLDivElement>(null);
  const contentBoxM = useRef<HTMLDivElement>(null);
  const imageRef1M = useRef<HTMLDivElement>(null);
  const section2MTitle1 = useRef<HTMLDivElement>(null);
  const section3M = useRef<HTMLDivElement>(null);
  const section3Ma = useRef<HTMLDivElement>(null);

  const section4M = useRef<HTMLDivElement>(null);
  const section41M = useRef<HTMLDivElement>(null);
  const section5M = useRef<HTMLDivElement>(null);
  const section51M = useRef<HTMLDivElement>(null);
  

  
  const handleCloseModal = useCallback(() => {
    closeModal(); // Fermer la modale
  }, [closeModal]);
  
/******  f6b50df9-ef39-417c-89ca-5721e3ccd30d  *******/
  const handleUnsubscribeModal = () => {
    openModal(
      <UnsubscribeModal 
        onClose={handleCloseModal} 
      />
    );
  };
  useEffect(() => {
    const showUnsubscribeModal = searchParams?.get("showUnsubscribeModal");
    if (showUnsubscribeModal === "true") {
      openModal(
        <UnsubscribeModal 
          onClose={handleCloseModal} 
        />
      );      
      // Supprimer le paramètre showUnsubscribeModal de l'URL
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      newSearchParams.delete("showUnsubscribeModal");
      const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams, openModal, handleCloseModal]);


  const [sectionPosition, setSectionPosition] = useState<number>(1);
   const sectionsRef = useMemo(
    () => [section1, section2, section3, section4, section5],
    []
  ); 

  useEffect(() => {
    // Enregistrer les références dans le contexte
    sectionsRef.forEach((section, index) => {
      setSectionRef(index, section.current);
    });
  }, [setSectionRef, sectionsRef]);


  useEffect(() => {
    const currentSectionRef = sectionsRef[sectionPosition - 1];
    if (currentSectionRef?.current) {
      // Durée plus longue pour apprécier l'effet élastique, par exemple 2000ms
      smoothScrollTo(currentSectionRef.current, 1500); 
    }
  }, [sectionPosition, sectionsRef]);


  const handleSectionClickPlus = () => {
    setSectionPosition((prev) => Math.min(prev + 1, sectionsRef.length));
  };
  const handleSectionClickMinus = () => {
    setSectionPosition((prev) => Math.max(prev - 1, 1));
  };

  const facebookVideoUrl =
    "https://fb.watch/xgvTdqbHcb/";

  useEffect(() => {
    // Si l'utilisateur est connecté et a le rôle admin
    if (session?.user && (session.user as User).role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);  
  
  const [isMobile, setIsMobile] = useState(false);  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const sect1 = section1.current;
    const sect1Content = section1Content.current;
    const sect2 = section2.current;
    const sect3 = section3.current;
    const sect4 = section4.current;
    const sect41 = section41.current;
    const sect5 = section5.current;
    const title1 = section2Title1.current;
    const title3 = section3Title1.current;


   // ! Deskstop
    mm.add("(min-width: 769px)", () => {

       // ScrollTrigger par section pour mettre à jour sectionPosition
    if (sect1) {
      ScrollTrigger.create({
        trigger: sect1,
        start: "top center",
        end: "bottom 30%",
        onEnter: () => setSectionPosition(1),
        onEnterBack: () => {
          setSectionPosition(1);
          gsap.fromTo(
            sect1Content,
            { y: 0 }, // État initial
            { y: -20, duration: 2, ease: "elastic.out(2, 0.3)" } // État final
          );
        },
      });
    }
    if (sect2) {
      ScrollTrigger.create({
        trigger: sect2,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setSectionPosition(2),
        onEnterBack: () => setSectionPosition(2),
      });
    }
    if (sect3) {
      ScrollTrigger.create({
        trigger: sect3,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setSectionPosition(3),
        onEnterBack: () => setSectionPosition(3),
        
      });
    }
    if (sect4) {
      ScrollTrigger.create({
        trigger: sect4,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setSectionPosition(4),
        onEnterBack: () => setSectionPosition(4),
      });
    }  
    if (sect5) {
      ScrollTrigger.create({
        trigger: sect5,
        start: "top center",
        end: "bottom 30%",
        onEnter: () => setSectionPosition(5),
      });
    }
    if (sect1 && sect1Content) {
        gsap.timeline({
        scrollTrigger: {
          trigger: sect1,
          start: "bottom center",
          end: "bottom top+=200",
          scrub: true,
        },
      })
      .to(sect1, {
        opacity: 0,
      })
      .to(title1, {
          opacity: 1,
        })
              
    }
    if (sect2) {
      gsap.set(contentBox.current, {
        opacity:0,
        y:-100,
        scale:0.8
      });
      gsap.set(section2Title1.current, { 
        opacity:0, 
        y:50, 
        scale:0.5,
        filter:"blur(10px)" 
      });
      gsap.set(imageRefFB.current, { 
        opacity:0, 
        rotationY:90, 
        transformOrigin:"center center",
        scale:0.5
      });
      gsap.set(imageRef1.current, { 
        opacity:0, 
        scale:0.5,
        y:50
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2.current,
          start: "top 50%", // Ajustez ce point pour que l'animation démarre plus tard ou plus tôt
          once: true,
          toggleActions: "play none none none",
        }
      });
      tl.to(contentBox.current, {
        opacity:1,
        y:0,
        scale:1,
        duration:1.2,
        ease:"elastic.out(1, 0.5)"
      })
      .to(imageRefFB.current, {
        opacity:1,
        rotationY:0,
        scale:1,
        duration:1.2,
        ease:"elastic.out(1, 0.5)"
      }, "-=0.8")
      .to(section2Title1.current, {
        opacity: 1, 
        y:0, 
        scale:1,
        filter: "blur(0px)",
        duration:1.2,
        ease:"elastic.out(1, 0.5)"
      }, "-=1.0")
      .to(imageRef1.current, {
        opacity:1,
        y:0,
        scale:1,
        duration:1.2,
        ease:"elastic.out(1, 0.5)"
      }, "<");
    }
      if (sect3) {
         gsap.timeline({
          scrollTrigger: {
            trigger: sect3,
            start: "top bottom",
            end: "top top",
            scrub: true,      
          },
         })
         .to(sect2, {
           opacity: 0,
          })
          .fromTo(title3, {
            opacity: 0,
            scale: 0,
          }, {
            opacity: 1,
            scale: 1,
          })
      }
      if (sect4) {
        ScrollTrigger.create({
          trigger: sect4,
          start: "top 90%",
          onEnter: () => setShowMasonry(true),
          onLeaveBack: () => setShowMasonry(false),
        });
        gsap.timeline({
          scrollTrigger: {
            trigger: sect4,
            start: "top bottom",
            end: "top 20%",
            scrub: true, 
          },
        })
        .to(sect3, {
          opacity: 0,
        })
      }
      if (sect41) {        
         gsap.timeline({
          scrollTrigger: {
            trigger: sect41,
            start: "top 60%",
            end: "top top",
            scrub: true, 
          },
         })
         .to(sect4, {
           opacity: 0,
         })        
      }
    });    

    // ! Mobile
    mm.add("(max-width: 768px)", () => { 
      if(section2M.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section2M.current,
            start: "top 50%",
            end: "top 20%",
            scrub: true,
          }
        })
        .to(section1M.current, {
          opacity: 0,
        })
      } 
      if(section3M.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section2MTitle1.current,
            start: "top 50%",
            end: "top 20%",
            scrub: true,
          }
        })
        .to(imageRef1M.current, {
          opacity: 0,
        })
        gsap.timeline({
          scrollTrigger: {
            trigger: section3M.current,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          }
        })
        .to(contentBoxM.current, {
          opacity: 0,
        })

        if(animationM.current) {
          
          const paragraphs = animationM.current.querySelectorAll(".enter-animation");
          paragraphs.forEach((paragraph) => {
            gsap.set(paragraph, { opacity: 0, y: 90 });
  
            gsap.timeline({
              scrollTrigger: {
                trigger: paragraph, // Chaque élément devient le déclencheur
                start: "top 95%", // Animation commence lorsque l'élément atteint 90% du viewport
                end: "top 85%", // Animation se termine juste après
                scrub: false, // Synchronisation avec le scroll
                toggleActions: "play none none none", // Animation joue seulement une fois
              },
            }).to(paragraph, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          });
        }
        if (section4M.current) {
          ScrollTrigger.create({
            trigger: section4M.current,
            start: "top 70%",
            onEnter: () => setShowMasonry(true),
            onLeaveBack: () => setShowMasonry(false),
          });
        
        }

      } 
     
   
    });
   
    
    return () => mm.revert(); // Nettoyage des animations
  }, [isMobile, section1, section1Content]);

  return (
    <> 
       { !isMobile && (      
        
        <div >
          {/* Boutons de navigation */}
          
          <div className=" flex flex-col gap-2 button-nav-section "
          >
            {sectionPosition !== 1 && (
              <button 
                onClick={handleSectionClickMinus} 
                className="button-nav-section-up"
                aria-label="Aller à la section précédente"

              >
                <RiScrollToBottomLine />
                {/* <span>{sectionPosition}</span> */}
              </button>
            )}
            {sectionPosition !== sectionsRef.length && (
              <button 
                onClick={handleSectionClickPlus} 
                className="button-nav-section-down"
                aria-label="Aller à la section suivante"
              >
                <RiScrollToBottomLine />
                {/* <span>{sectionPosition}</span> */}
              </button>
            )}
          </div>
          {/* Section 1 */}
          <section
            ref={section1}
            className="section1"
          >
            <div className="section1-div" >
              <Image
                src="/images/s-boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34-2.jpg"
                alt="Live shopping Facebook Mode pas chère en ligne"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                loading="lazy"
              />
            </div>
              {/* Contenu de la section */}
              <div ref={section1Content} className="section1-content font-aboreto">
                <h1 className="section1-title tracking-wide">Bienvenue sur Chic&#39;Mixt</h1>
                <div className="content-hook">
                  <div className="section1-left">
                    <p className="section1-description" style={{color:'#de277b'}}>Live shopping tous les lundis à partir de 20h30</p>
                    <p className="section1-description">Plongez dans l&#39;univers de la mode tendance avec notre boutique de vêtements en live. </p>

                  </div>
                  <div className="section1-right">
                    <p style={{width:"100%"}} className="section1-description">Nous proposons une large sélection de vêtements femme, homme, enfant et accessoires de mode pour tous les styles et toutes les occasions.</p>
                    <button
                      onClick={handleSectionClickPlus}
                      aria-label="Aller à la section suivante, découvrir Chic'mixt"
                    >
                      Découvrir
                    </button>
                  </div>
                </div>

              </div>
          </section>    
        {/* Section 2 */}
          <section ref={section2} className="section2">
              <div className="left-col">
                <div className="image-wrapper" ref={imageRef1}>
                    <FacebookLiveVideo videoUrl={facebookVideoUrl}/>
                </div>
              </div>
              <div className="right-col">
                <a href="https://fb.watch/xgvTdqbHcb/" target="_blank" rel="noopener noreferrer">
                  <div className="content-box" ref={contentBox}>
                    <div className="logo-fb-container" ref={imageRefFB}>
                      <Image
                        className="logo-fb-img"
                        src="/images/Facebook-logo-chicMixt.jpeg"
                        alt="Facebook Vêtements en ligne Live Chic'mixt"
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                    <h2 ref={section2Title1}>RETROUVEZ-NOUS EN LIVE SUR FACEBOOK</h2>
                    <p>
                      Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d&#39;offres spéciales. Interagissez en direct, posez vos questions et faites vos achats en toute simplicité.
                    </p>
                  {/* <div 
                    style={{width:"225px", paddingTop: "10px"}} 
                    className="fb-like" 
                    data-href="https://www.facebook.com/profile.php?id=61555657774462" data-width="350px" 
                    data-layout="button_count" 
                    data-action="like" 
                    data-size="large" 
                    data-share="true">
                  </div>                   */}
                  </div>
                </a>
                <div className="share">
                  <span className="share-text">
                    Partagez à vos amis et profitez des bons plans Mode Chic&#39;Mixt sur vos réseaux préférés !
                  </span>
                  <ReactShare iconSize={40} />
                </div>
              </div>                    
            </section>
        {/* Section 3 */}
          <section ref={section3} className="section3 ">
              <div ref={section3Title1} className="section3-left">
                <div className="info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <h2 className="section3-title">
                    ✨ Des lundis soirs remplis de soleil et de bonne humeur !
                  </h2>
                  <p className="section3-text">
                    <strong>Rejoignez-nous pour des lives pleins de joie et de fous rires.</strong><br />
                    Venez vous détendre avec Chic&#39;Mixt et découvrez notre collection à tout petit prix !
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
              style={{backgroundImage: "url('/images/hook2/hook2-2.png')"}}
            >             
            </div>
          </section>
           <section ref={section4}>
            <div className="section4">
              {showMasonry && <MasonryGridGallery />}
            </div>
            <div ref={section41} className="reassurance">
              <ReassuranceSection />
            </div>
          </section>
          <div ref={section5} className="section6">
            <CarouselComments />
          </div>
          {isAdmin && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Ajouter un Commentaire</h2>
              <CommentForm />
            </div>
          )}
          <div ref={section51} className="section7">
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
              <p style={{cursor:"pointer", fontStyle:"italic", marginTop:"10px", opacity:"0.6"}} onClick={handleUnsubscribeModal}>Se désabonner de la newsletter</p>
            </div>
          </div>
          <div style={{height:"100px"}}></div>
        </div>
      )}
      { isMobile && (      
        <div ref={animationM}>
       
          {/* Section 1 */}
          <section
            ref={section1M}
            className="section1"
          >
            <div className="section1-div" >
              <Image
                src="/images/s-boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34-2.jpg"
                alt="Live shopping Facebook Mode pas chère en ligne"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                loading="lazy"
              />
            </div>
              {/* Contenu de la section */}
              <div ref={section1Content} className="section1-content font-aboreto">
                <h1 className="section1-title tracking-wide">Bienvenue sur Chic&#39;Mixt</h1>
                <div className="content-hook">
                  <div className="section1-left">
                    <p className="section1-description" style={{color:"#de277b"}}>Live shopping tous les lundis à partir de 20h30</p>
                    <p className="section1-description">Plongez dans l&#39;univers de la mode tendance avec notre boutique de vêtements en live. </p>
                  </div>
                  <div className="section1-right">
                    <p style={{width:"100%"}} className="section1-description">Nous proposons une large sélection de vêtements femme, homme, enfant et accessoires de mode pour tous les styles et toutes les occasions.</p>
                  </div>
                </div>

              </div>
          </section>    
        {/* Section 2 */}
          <section ref={section2M} className="section2M">
            <div className="section2M-facebook enter-animation" ref={imageRef1M}>
                <FacebookLiveVideoMobile />
            </div>     
            <div className="section2M-content">
                <div className="content-box" ref={contentBoxM}>
                  <a href="https://www.facebook.com/profile.php?id=61555657774462" target="_blank" rel="noopener noreferrer">
                      <div className="logo-fb-container" ref={imageRefFB}>
                        <Image
                          className="logo-fb-img"
                          src="/images/Facebook-logo-chicMixt.jpeg"
                          alt="Facebook Vêtements en ligne Live Chic'mixt"
                          width={80}
                          height={80}
                          loading="lazy"
                        />
                        <h1 className="enter-animation" ref={section2MTitle1}>RETROUVEZ-NOUS EN LIVE SUR FACEBOOK</h1>
                      </div>
                  </a>
                  <p className="enter-animation">
                    Rejoignez-nous lors de nos lives shopping Facebook pour découvrir en exclusivité nos nouveautés et profiter d&#39;offres spéciales. Interagissez en direct, posez vos questions et faites vos achats en toute simplicité.
                  </p>                       
                </div>
                <div className="share">
                  <span className="share-text enter-animation">
                    Partagez à vos amis et profitez des bons plans Mode Chic&#39;Mixt sur vos réseaux préférés !
                  </span>
                  <ReactShare iconSize={40} />
                </div>
              </div>                       
          </section>
          {/* Section 3 */}
          <section ref={section3M} className="section3M ">
             
                <div className="info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow section3M-content enter-animation">
                  <h2 className="section3-title">
                    ✨ Vente de vêtements et accessoires en Direct tous les lundis soir ✨
                  </h2>
                  <p className="section3-text enter-animation" ref={section3Ma}>
                    <strong>Rejoignez-nous pour des lives pleins de joie et de fous rires.</strong><br />
                    Venez vous détendre avec Chic&#39;Mixt et découvrez notre collection à tout petit prix !
                  </p>
                  <p className="section3-text enter-animation">
                    <strong>Comment Participer : </strong> <br />
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
                    <span><strong >Nos Collections :</strong></span>
                    <ul className="collection-list">
                      <li className="enter-animation">Nouveautés Mode : Restez à la pointe de la mode avec nos dernières arrivées.</li>
                      <li className="enter-animation">Vêtements Femme : Robes, tops, pantalons pour sublimer votre style.</li>
                      <li className="enter-animation">Vêtements Homme : Un look moderne et élégant.</li>
                      <li className="enter-animation">Vêtements Enfants : Pour les enfants de 0 à 12 ans.</li>
                      <li className="enter-animation">Accessoires de Mode : Sacs, bijoux, écharpes pour parfaire votre tenue.</li>
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
          <section ref={section4M}>
            <div className="section4M">
              {showMasonry && <MasonryGridGallery />}
            </div>
            <div ref={section41M} className="reassurance mt-12 enter-animation">
              <ReassuranceSection />
            </div>
          </section>
          <div ref={section5M} className="section5M enter-animation">
            <CarouselComments />
          </div>
          <div ref={section51M} className="section51M">
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
              <p style={{cursor:"pointer", fontStyle:"italic", marginTop:"10px", opacity:"0.6"}} onClick={handleUnsubscribeModal}>Se désabonner de la newsletter</p>
            </div>
          </div>
          <div style={{height:"100px"}}></div>
        </div>
        
      )}
    </>
  );
}
