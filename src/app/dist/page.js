"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var react_2 = require("next-auth/react");
var AppWrapper_1 = require("../../components/AppWrapper");
var image_1 = require("next/image");
var navigation_1 = require("next/navigation");
var ModalContext_1 = require("../../contexts/ModalContext");
var gsap_1 = require("gsap");
var react_3 = require("@gsap/react");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var fc_1 = require("react-icons/fc");
var FacebookLiveVideo_1 = require("../../components/FacebookLiveVideo");
var FacebookLiveVideoMobile_1 = require("../../components/FacebookLiveVideoMobile");
var ReactShare_1 = require("../../components/ReactShare");
var MasonryGridGallery = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('../../components/MasonGridGalerry'); }); }, {
    ssr: false,
    loading: function () { return React.createElement("p", null, "Loading..."); }
});
var HookHomePage_1 = require("../../components/HookHomePage/HookHomePage");
var Section1Content_1 = require("../../components/Section1Content/Section1Content");
var ReassuranceSection_1 = require("../../components/ReassuranceSection");
var CarouselComments_1 = require("../../components/CarouselComments");
var CommentForm_1 = require("../../components/CommentForm"); // Ajout du formulaire de commentaires
var SubscriberForm_1 = require("../../components/SubscriberForm");
var UnsubscribeModal_1 = require("../../components/UnsubscribeModal");
// // Fonction d'easing élastique, inspirée d'easings.net (easeOutElastic)
// // const easedProgress = easeOutElastic(progress);
// function easeOutElastic(t: number): number {
//   const c4 = (2 * Math.PI) / 3.5;
//   return t === 0
//     ? 0
//     : t === 1
//       ? 1
//       : Math.pow(2, -8 * t) * Math.sin((t * 4 - 0.75) * c4) + 1;
// }
// function smoothScrollTo(element: HTMLElement, duration = 1000) {
//   const start = window.scrollY;
//   const end = element.getBoundingClientRect().top + start - 120;
//   const distance = end - start;
//   let startTime: number | null = null;
//   function animation(currentTime: number) {
//     if (startTime === null) startTime = currentTime;
//     const timeElapsed = currentTime - startTime;
//     const progress = Math.min(timeElapsed / duration, 1);
//     // Application de l'easing élastique sur la progression
//     const easedProgress = easeOutElastic(progress);
//     window.scrollTo(0, start + distance * easedProgress);
//     if (timeElapsed < duration) {
//       requestAnimationFrame(animation);
//     }
//   }
//   requestAnimationFrame(animation);
// }
function Home() {
    var _a = react_1.useContext(ModalContext_1.ModalContext), openModal = _a.openModal, closeModal = _a.closeModal;
    var searchParams = navigation_1.useSearchParams();
    var _b = react_1.useState(false), isAdmin = _b[0], setIsAdmin = _b[1]; // État pour vérifier si l'utilisateur est un admin
    var session = react_2.useSession().data; // Obtenir les informations de session
    var setSectionRef = AppWrapper_1.useSectionContext().setSectionRef;
    var _c = react_1.useState(false), showMasonry = _c[0], setShowMasonry = _c[1];
    var section1 = react_1.useRef(null);
    var section1Content = react_1.useRef(null);
    var section2 = react_1.useRef(null);
    var section3 = react_1.useRef(null);
    var section4 = react_1.useRef(null);
    var section41 = react_1.useRef(null);
    var section5 = react_1.useRef(null);
    var section51 = react_1.useRef(null);
    var imageRefFB = react_1.useRef(null);
    var imageRef1 = react_1.useRef(null); // Référence pour l'image animée
    var contentBox = react_1.useRef(null);
    var section2Title1 = react_1.useRef(null);
    var section3Title1 = react_1.useRef(null);
    // ref Mobile
    var animationM = react_1.useRef(null);
    var section1M = react_1.useRef(null);
    var section2M = react_1.useRef(null);
    var contentBoxM = react_1.useRef(null);
    var imageRef1M = react_1.useRef(null);
    var section2MTitle1 = react_1.useRef(null);
    var section3M = react_1.useRef(null);
    var section3Ma = react_1.useRef(null);
    var section4M = react_1.useRef(null);
    var section41M = react_1.useRef(null);
    var section5M = react_1.useRef(null);
    var section51M = react_1.useRef(null);
    var handleCloseModal = react_1.useCallback(function () {
        closeModal(); // Fermer la modale
    }, [closeModal]);
    /******  f6b50df9-ef39-417c-89ca-5721e3ccd30d  *******/
    var handleUnsubscribeModal = function () {
        openModal(React.createElement(UnsubscribeModal_1["default"], { onClose: handleCloseModal }));
    };
    react_1.useEffect(function () {
        var showUnsubscribeModal = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get("showUnsubscribeModal");
        if (showUnsubscribeModal === "true") {
            openModal(React.createElement(UnsubscribeModal_1["default"], { onClose: handleCloseModal }));
            // Supprimer le paramètre showUnsubscribeModal de l'URL
            var newSearchParams = new URLSearchParams(searchParams === null || searchParams === void 0 ? void 0 : searchParams.toString());
            newSearchParams["delete"]("showUnsubscribeModal");
            var newUrl = window.location.pathname + "?" + newSearchParams.toString();
            window.history.replaceState(null, "", newUrl);
        }
    }, [searchParams, openModal, handleCloseModal]);
    // const [sectionPosition, setSectionPosition] = useState<number>(1);
    //  const sectionsRef = useMemo(
    //   () => [section1, section2, section3, section4, section5],
    //   []
    // ); 
    // useEffect(() => {
    //   // Enregistrer les références dans le contexte
    //   sectionsRef.forEach((section, index) => {
    //     setSectionRef(index, section.current);
    //   });
    // }, [setSectionRef, sectionsRef]);
    // useEffect(() => {
    //   const currentSectionRef = sectionsRef[sectionPosition - 1];
    //   if (currentSectionRef?.current) {
    //     // Durée plus longue pour apprécier l'effet élastique, par exemple 2000ms
    //     smoothScrollTo(currentSectionRef.current, 500); 
    //   }
    // }, [sectionPosition, sectionsRef]);
    var handleSectionClickPlus = function () {
        console.log("Plus");
    };
    var facebookVideoUrl = "https://fb.watch/xgvTdqbHcb/";
    react_1.useEffect(function () {
        // Si l'utilisateur est connecté et a le rôle admin
        if ((session === null || session === void 0 ? void 0 : session.user) && session.user.role === "admin") {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }, [session]);
    var _d = react_1.useState(false), isMobile = _d[0], setIsMobile = _d[1];
    react_1.useEffect(function () {
        var handleResize = function () {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    react_3.useGSAP(function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
        var mm = gsap_1.gsap.matchMedia();
        var sect1 = section1.current;
        var sect1Content = section1Content.current;
        var sect2 = section2.current;
        var sect3 = section3.current;
        var sect4 = section4.current;
        var sect41 = section41.current;
        var sect5 = section5.current;
        var title1 = section2Title1.current;
        var title3 = section3Title1.current;
        // ! Deskstop
        mm.add("(min-width: 769px)", function () {
            // ScrollTrigger par section pour mettre à jour sectionPosition
            if (sect1) {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: sect1,
                    start: "top center",
                    end: "bottom 30%"
                });
            }
            if (sect2) {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: sect2,
                    start: "top 70%",
                    end: "bottom 30%"
                });
            }
            if (sect3) {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: sect3,
                    start: "top 70%",
                    end: "bottom 30%"
                });
            }
            if (sect4) {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: sect4,
                    start: "top 70%",
                    end: "bottom 30%"
                });
            }
            if (sect5) {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: sect5,
                    start: "top center",
                    end: "bottom 30%"
                });
            }
            if (sect1 && sect1Content) {
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: sect1,
                        start: "bottom center",
                        end: "bottom top+=200",
                        scrub: true
                    }
                })
                    .to(sect1, {
                    opacity: 0
                })
                    .to(title1, {
                    opacity: 1
                });
            }
            if (sect2) {
                gsap_1.gsap.set(contentBox.current, {
                    opacity: 0,
                    y: -100,
                    scale: 0.8
                });
                gsap_1.gsap.set(section2Title1.current, {
                    opacity: 0,
                    y: 50,
                    scale: 0.5,
                    filter: "blur(10px)"
                });
                gsap_1.gsap.set(imageRefFB.current, {
                    opacity: 0,
                    rotationY: 90,
                    transformOrigin: "center center",
                    scale: 0.5
                });
                gsap_1.gsap.set(imageRef1.current, {
                    opacity: 0,
                    scale: 0.5,
                    y: 50
                });
                var tl = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section2.current,
                        start: "top 50%",
                        once: true,
                        toggleActions: "play none none none"
                    }
                });
                tl.to(contentBox.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                })
                    .to(imageRefFB.current, {
                    opacity: 1,
                    rotationY: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.8")
                    .to(section2Title1.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                }, "-=1.0")
                    .to(imageRef1.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                }, "<");
            }
            if (sect3) {
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: sect3,
                        start: "top bottom",
                        end: "top top",
                        scrub: true
                    }
                })
                    .to(sect2, {
                    opacity: 0
                })
                    .fromTo(title3, {
                    opacity: 0,
                    scale: 0
                }, {
                    opacity: 1,
                    scale: 1
                });
            }
            if (sect4) {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: sect4,
                    start: "top 90%",
                    onEnter: function () { return setShowMasonry(true); },
                    onLeaveBack: function () { return setShowMasonry(false); }
                });
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: sect4,
                        start: "top bottom",
                        end: "top 20%",
                        scrub: true
                    }
                })
                    .to(sect3, {
                    opacity: 0
                });
            }
            if (sect41) {
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: sect41,
                        start: "top 60%",
                        end: "top top",
                        scrub: true
                    }
                })
                    .to(sect4, {
                    opacity: 0
                });
            }
        });
        // ! Mobile
        mm.add("(max-width: 768px)", function () {
            if (section2M.current) {
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section2M.current,
                        start: "top 50%",
                        end: "top 20%",
                        scrub: true
                    }
                })
                    .to(section1M.current, {
                    opacity: 0
                });
            }
            if (section3M.current) {
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section2MTitle1.current,
                        start: "top 50%",
                        end: "top 20%",
                        scrub: true
                    }
                })
                    .to(imageRef1M.current, {
                    opacity: 0
                });
                gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section3M.current,
                        start: "top 70%",
                        end: "top 40%",
                        scrub: true
                    }
                })
                    .to(contentBoxM.current, {
                    opacity: 0
                });
                if (animationM.current) {
                    var paragraphs = animationM.current.querySelectorAll(".enter-animation");
                    paragraphs.forEach(function (paragraph) {
                        gsap_1.gsap.set(paragraph, { opacity: 0, y: 90 });
                        gsap_1.gsap.timeline({
                            scrollTrigger: {
                                trigger: paragraph,
                                start: "top 95%",
                                end: "top 85%",
                                scrub: false,
                                toggleActions: "play none none none"
                            }
                        }).to(paragraph, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                    });
                }
                if (section4M.current) {
                    ScrollTrigger_1.ScrollTrigger.create({
                        trigger: section4M.current,
                        start: "top 70%",
                        onEnter: function () { return setShowMasonry(true); },
                        onLeaveBack: function () { return setShowMasonry(false); }
                    });
                }
            }
        });
        return function () { return mm.revert(); }; // Nettoyage des animations
    }, [isMobile, section1, section1Content]);
    return (React.createElement(React.Fragment, null,
        !isMobile && (React.createElement("div", null,
            React.createElement("section", { ref: section1, className: "section1" },
                React.createElement("div", { className: "section1-div" },
                    React.createElement(HookHomePage_1["default"], null)),
                React.createElement(Section1Content_1["default"], { handleSectionClickPlus: handleSectionClickPlus })),
            React.createElement("section", { ref: section2, className: "section2" },
                React.createElement("div", { className: "left-col" },
                    React.createElement("div", { className: "image-wrapper", ref: imageRef1 },
                        React.createElement(FacebookLiveVideo_1["default"], { videoUrl: facebookVideoUrl }))),
                React.createElement("div", { className: "right-col" },
                    React.createElement("a", { href: "https://fb.watch/xgvTdqbHcb/", target: "_blank", rel: "noopener noreferrer" },
                        React.createElement("div", { className: "content-box", ref: contentBox },
                            React.createElement("div", { className: "logo-fb-container", ref: imageRefFB },
                                React.createElement(image_1["default"], { className: "logo-fb-img", src: "/images/Facebook-logo-chicMixt.jpeg", alt: "Facebook V\u00EAtements en ligne Live Chic'mixt", width: 200, height: 200, loading: "lazy" })),
                            React.createElement("h2", { ref: section2Title1 }, "RETROUVEZ-NOUS EN LIVE SUR FACEBOOK"),
                            React.createElement("p", null, "Rejoignez-nous lors de nos lives shopping Facebook pour d\u00E9couvrir en exclusivit\u00E9 nos nouveaut\u00E9s et profiter d'offres sp\u00E9ciales. Interagissez en direct, posez vos questions et faites vos achats en toute simplicit\u00E9."))),
                    React.createElement("div", { className: "share" },
                        React.createElement("span", { className: "share-text" }, "Partagez \u00E0 vos amis et profitez des bons plans Mode Chic'Mixt sur vos r\u00E9seaux pr\u00E9f\u00E9r\u00E9s !"),
                        React.createElement(ReactShare_1.ReactShare, { iconSize: 40 })))),
            React.createElement("section", { ref: section3, className: "section3 " },
                React.createElement("div", { ref: section3Title1, className: "section3-left" },
                    React.createElement("div", { className: "info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow" },
                        React.createElement("h2", { className: "section3-title" }, "\u2728 Des lundis soirs remplis de soleil et de bonne humeur !"),
                        React.createElement("p", { className: "section3-text" },
                            React.createElement("strong", null, "Rejoignez-nous pour des lives pleins de joie et de fous rires."),
                            React.createElement("br", null),
                            "Venez vous d\u00E9tendre avec Chic'Mixt et d\u00E9couvrez notre collection \u00E0 tout petit prix !"),
                        React.createElement("p", { className: "section3-text" },
                            React.createElement("strong", null, "Comment Participer : "),
                            "Suivez-nous sur",
                            " ",
                            React.createElement("a", { href: "https://www.facebook.com/profile.php?id=61555657774462", target: "_blank", rel: "noopener noreferrer", className: "text-link" }, "Facebook"),
                            " ",
                            "et activez les notifications pour ne rien manquer."),
                        React.createElement("div", { className: "section3-text" },
                            React.createElement("strong", null, "Nos Collections :"),
                            React.createElement("ul", { className: "collection-list" },
                                React.createElement("li", null, "Nouveaut\u00E9s Mode : Restez \u00E0 la pointe de la mode avec nos derni\u00E8res arriv\u00E9es."),
                                React.createElement("li", null, "V\u00EAtements Femme : Robes, tops, pantalons pour sublimer votre style."),
                                React.createElement("li", null, "V\u00EAtements Homme : Un look moderne et \u00E9l\u00E9gant."),
                                React.createElement("li", null, "V\u00EAtements Enfants : Pour les enfants de 0 \u00E0 12 ans."),
                                React.createElement("li", null, "Accessoires de Mode : Sacs, bijoux, \u00E9charpes pour parfaire votre tenue.")))),
                    React.createElement("div", { className: "cta-area" },
                        React.createElement("p", { className: "section3-text-cta" }, "Prochain Live : lundi 20h30 !"),
                        React.createElement("a", { className: "calendar-link", href: "/calendrier.ics", download: true },
                            React.createElement("span", { className: "calendar-icon-wrapper" },
                                React.createElement(fc_1.FcCalendar, { className: "calendar-icon" })),
                            "Ajouter \u00E0 mon calendrier"))),
                React.createElement("div", { className: "section3-right", style: { backgroundImage: "url('/images/hook2/hook2-2.png')" } })),
            React.createElement("section", { ref: section4 },
                React.createElement("div", { className: "section4" }, showMasonry && React.createElement(MasonryGridGallery, null)),
                React.createElement("div", { ref: section41, className: "reassurance" },
                    React.createElement(ReassuranceSection_1["default"], null))),
            React.createElement("div", { ref: section5, className: "section6" },
                React.createElement(CarouselComments_1.CarouselComments, null)),
            isAdmin && (React.createElement("div", { className: "mt-8" },
                React.createElement("h2", { className: "text-2xl font-bold mb-4" }, "Ajouter un Commentaire"),
                React.createElement(CommentForm_1["default"], null))),
            React.createElement("div", { ref: section51, className: "section7" },
                React.createElement("div", { className: "section7-left" },
                    React.createElement(image_1["default"], { src: "/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png", alt: "Meilleure boutique de mode en ligne", width: 400, height: 400, quality: 80, loading: "lazy" })),
                React.createElement("div", { className: "section7-right" },
                    React.createElement(SubscriberForm_1["default"], null),
                    React.createElement("p", { style: { cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }, onClick: handleUnsubscribeModal }, "Se d\u00E9sabonner de la newsletter"))),
            React.createElement("div", { style: { height: "100px" } }))),
        isMobile && (React.createElement("div", { ref: animationM },
            React.createElement("section", { ref: section1M, className: "section1" },
                React.createElement("div", { className: "section1-div" },
                    React.createElement(image_1["default"], { src: "/images/s-boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34-2.jpg", alt: "Live shopping Facebook Mode pas ch\u00E8re en ligne", fill: true, style: { objectFit: 'cover' }, quality: 100, loading: "lazy" })),
                React.createElement("div", { ref: section1Content, className: "section1-content font-aboreto" },
                    React.createElement("h1", { className: "section1-title tracking-wide" }, "Bienvenue sur Chic'Mixt"),
                    React.createElement("div", { className: "content-hook" },
                        React.createElement("div", { className: "section1-left" },
                            React.createElement("p", { className: "section1-description", style: { color: "#de277b" } }, "Live shopping tous les lundis \u00E0 partir de 20h30"),
                            React.createElement("p", { className: "section1-description" }, "Plongez dans l'univers de la mode tendance avec notre boutique de v\u00EAtements en live. ")),
                        React.createElement("div", { className: "section1-right" },
                            React.createElement("p", { style: { width: "100%" }, className: "section1-description" }, "Nous proposons une large s\u00E9lection de v\u00EAtements femme, homme, enfant et accessoires de mode pour tous les styles et toutes les occasions."))))),
            React.createElement("section", { ref: section2M, className: "section2M" },
                React.createElement("div", { className: "section2M-facebook enter-animation", ref: imageRef1M },
                    React.createElement(FacebookLiveVideoMobile_1["default"], null)),
                React.createElement("div", { className: "section2M-content" },
                    React.createElement("div", { className: "content-box", ref: contentBoxM },
                        React.createElement("a", { href: "https://www.facebook.com/profile.php?id=61555657774462", target: "_blank", rel: "noopener noreferrer" },
                            React.createElement("div", { className: "logo-fb-container", ref: imageRefFB },
                                React.createElement(image_1["default"], { className: "logo-fb-img", src: "/images/Facebook-logo-chicMixt.jpeg", alt: "Facebook V\u00EAtements en ligne Live Chic'mixt", width: 80, height: 80, loading: "lazy" }),
                                React.createElement("h1", { className: "enter-animation", ref: section2MTitle1 }, "RETROUVEZ-NOUS EN LIVE SUR FACEBOOK"))),
                        React.createElement("p", { className: "enter-animation" }, "Rejoignez-nous lors de nos lives shopping Facebook pour d\u00E9couvrir en exclusivit\u00E9 nos nouveaut\u00E9s et profiter d'offres sp\u00E9ciales. Interagissez en direct, posez vos questions et faites vos achats en toute simplicit\u00E9.")),
                    React.createElement("div", { className: "share" },
                        React.createElement("span", { className: "share-text enter-animation" }, "Partagez \u00E0 vos amis et profitez des bons plans Mode Chic'Mixt sur vos r\u00E9seaux pr\u00E9f\u00E9r\u00E9s !"),
                        React.createElement(ReactShare_1.ReactShare, { iconSize: 40 })))),
            React.createElement("section", { ref: section3M, className: "section3M " },
                React.createElement("div", { className: "info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow section3M-content enter-animation" },
                    React.createElement("h2", { className: "section3-title" }, "\u2728 Vente de v\u00EAtements et accessoires en Direct tous les lundis soir \u2728"),
                    React.createElement("p", { className: "section3-text enter-animation", ref: section3Ma },
                        React.createElement("strong", null, "Rejoignez-nous pour des lives pleins de joie et de fous rires."),
                        React.createElement("br", null),
                        "Venez vous d\u00E9tendre avec Chic'Mixt et d\u00E9couvrez notre collection \u00E0 tout petit prix !"),
                    React.createElement("p", { className: "section3-text enter-animation" },
                        React.createElement("strong", null, "Comment Participer : "),
                        " ",
                        React.createElement("br", null),
                        "Suivez-nous sur",
                        " ",
                        React.createElement("a", { href: "https://www.facebook.com/profile.php?id=61555657774462", target: "_blank", rel: "noopener noreferrer", className: "text-link" }, "Facebook"),
                        " ",
                        "et activez les notifications pour ne rien manquer."),
                    React.createElement("div", { className: "section3-text enter-animation" },
                        React.createElement("span", null,
                            React.createElement("strong", null, "Nos Collections :")),
                        React.createElement("ul", { className: "collection-list" },
                            React.createElement("li", { className: "enter-animation" }, "Nouveaut\u00E9s Mode : Restez \u00E0 la pointe de la mode avec nos derni\u00E8res arriv\u00E9es."),
                            React.createElement("li", { className: "enter-animation" }, "V\u00EAtements Femme : Robes, tops, pantalons pour sublimer votre style."),
                            React.createElement("li", { className: "enter-animation" }, "V\u00EAtements Homme : Un look moderne et \u00E9l\u00E9gant."),
                            React.createElement("li", { className: "enter-animation" }, "V\u00EAtements Enfants : Pour les enfants de 0 \u00E0 12 ans."),
                            React.createElement("li", { className: "enter-animation" }, "Accessoires de Mode : Sacs, bijoux, \u00E9charpes pour parfaire votre tenue."))),
                    React.createElement("div", { className: "cta-area" },
                        React.createElement("p", { className: "section3-text-cta enter-animation" }, "Prochain Live : lundi 20h30 !"),
                        React.createElement("a", { className: "calendar-link enter-animation", href: "/calendrier.ics", download: true },
                            React.createElement("span", { className: "calendar-icon-wrapper" },
                                React.createElement(fc_1.FcCalendar, { className: "calendar-icon" })),
                            "Ajouter \u00E0 mon calendrier")))),
            React.createElement("section", { ref: section4M },
                React.createElement("div", { className: "section4M" }, showMasonry && React.createElement(MasonryGridGallery, null)),
                React.createElement("div", { ref: section41M, className: "reassurance mt-12 enter-animation" },
                    React.createElement(ReassuranceSection_1["default"], null))),
            React.createElement("div", { ref: section5M, className: "section5M enter-animation" },
                React.createElement(CarouselComments_1.CarouselComments, null)),
            React.createElement("div", { ref: section51M, className: "section51M" },
                React.createElement("div", { className: "section51M-left" },
                    React.createElement(image_1["default"], { src: "/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png", alt: "Meilleure boutique de mode en ligne", width: 80, height: 80, quality: 80, loading: "lazy" })),
                React.createElement("div", { className: "section51M-right enter-animation" },
                    React.createElement(SubscriberForm_1["default"], null),
                    React.createElement("p", { style: { cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }, onClick: handleUnsubscribeModal }, "Se d\u00E9sabonner de la newsletter"))),
            React.createElement("div", { style: { height: "100px" } })))));
}
exports["default"] = Home;
