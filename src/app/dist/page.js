"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var react_2 = require("next-auth/react");
var useSectionRefs_1 = require("../../hooks/useSectionRefs");
var useScrollEnterAnimation_1 = require("../../hooks/useScrollEnterAnimation");
var useDesktopAnimations_1 = require("../../hooks/useDesktopAnimations");
var AppWrapper_1 = require("../../components/AppWrapper");
var image_1 = require("next/image");
var navigation_1 = require("next/navigation");
var ModalContext_1 = require("../../contexts/ModalContext");
var fc_1 = require("react-icons/fc");
var FacebookLiveVideoMobile_1 = require("../../components/FacebookLiveVideoMobile");
var MasonryGridGallery = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("../../components/MasonGridGalerry"); }); }, {
    ssr: false,
    loading: function () { return react_1["default"].createElement("p", null, "Loading..."); }
});
var HookHomePage_1 = require("../../components/HookHomePage/HookHomePage");
var Section1Content_1 = require("../../components/Section1Content/Section1Content");
var Section2Content_1 = require("../../components/Section2Content/Section2Content");
var ReassuranceSection_1 = require("../../components/ReassuranceSection");
var CarouselComments_1 = require("../../components/CarouselComments");
var CommentForm_1 = require("../../components/CommentForm");
var SubscriberForm_1 = require("../../components/SubscriberForm");
var UnsubscribeModal_1 = require("../../components/UnsubscribeModal");
function Home() {
    // Récupération des refs depuis le hook
    var _a = useSectionRefs_1.useSectionRefs(), desktopRefs = _a.desktopRefs, mobileRefs = _a.mobileRefs;
    // Contexte et session
    var _b = react_1.useContext(ModalContext_1.ModalContext), openModal = _b.openModal, closeModal = _b.closeModal;
    var searchParams = navigation_1.useSearchParams();
    var session = react_2.useSession().data;
    var setSectionRef = AppWrapper_1.useSectionContext().setSectionRef;
    var _c = react_1.useState(false), showMasonry = _c[0], setShowMasonry = _c[1];
    // Appel des hooks d'animation
    useScrollEnterAnimation_1.useScrollEnterAnimation();
    useDesktopAnimations_1.useDesktopAnimations(desktopRefs, setShowMasonry);
    // Pour la version desktop, on utilise les refs centralisées
    var _d = react_1.useState(false), isAdmin = _d[0], setIsAdmin = _d[1];
    // Gestion de la modale
    var handleCloseModal = react_1.useCallback(function () {
        closeModal();
    }, [closeModal]);
    var handleUnsubscribeModal = function () {
        openModal(react_1["default"].createElement(UnsubscribeModal_1["default"], { onClose: handleCloseModal }));
    };
    // Gestion du paramètre dans l'URL
    react_1.useEffect(function () {
        var showUnsubscribeModal = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get("showUnsubscribeModal");
        if (showUnsubscribeModal === "true") {
            openModal(react_1["default"].createElement(UnsubscribeModal_1["default"], { onClose: handleCloseModal }));
            var newSearchParams = new URLSearchParams(searchParams === null || searchParams === void 0 ? void 0 : searchParams.toString());
            newSearchParams["delete"]("showUnsubscribeModal");
            var newUrl = window.location.pathname + "?" + newSearchParams.toString();
            window.history.replaceState(null, "", newUrl);
        }
    }, [searchParams, openModal, handleCloseModal]);
    // Vérification du rôle admin
    react_1.useEffect(function () {
        if ((session === null || session === void 0 ? void 0 : session.user) && session.user.role === "admin") {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }, [session]);
    // Détection mobile / desktop
    var _e = react_1.useState(false), isMobile = _e[0], setIsMobile = _e[1];
    react_1.useEffect(function () {
        var handleResize = function () { return setIsMobile(window.innerWidth <= 768); };
        handleResize();
        window.addEventListener("resize", handleResize);
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    // Rendu pour la version Desktop
    var DesktopView = function () { return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("section", { ref: desktopRefs.section1, className: "section1" },
            react_1["default"].createElement("div", { className: "section1-div" },
                react_1["default"].createElement(HookHomePage_1["default"], null)),
            react_1["default"].createElement(Section1Content_1["default"], { handleSectionClickPlus: function () { return console.log("Plus"); } })),
        react_1["default"].createElement("section", { ref: desktopRefs.section2, className: "section2" },
            react_1["default"].createElement(Section2Content_1["default"], null)),
        react_1["default"].createElement("section", { ref: desktopRefs.section3, className: "section3" },
            react_1["default"].createElement("div", { ref: desktopRefs.section3Title1, className: "section3-left" },
                react_1["default"].createElement("div", { className: "info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow" },
                    react_1["default"].createElement("h2", { className: "section3-title" }, "\u2728 Des lundis soirs remplis de soleil et de bonne humeur !"),
                    react_1["default"].createElement("p", { className: "section3-text" },
                        react_1["default"].createElement("strong", null, "Rejoignez-nous pour des lives pleins de joie et de fous rires."),
                        react_1["default"].createElement("br", null),
                        "Venez vous d\u00E9tendre avec Chic'Mixt et d\u00E9couvrez notre collection \u00E0 tout petit prix !"),
                    react_1["default"].createElement("p", { className: "section3-text" },
                        react_1["default"].createElement("strong", null, "Comment Participer : "),
                        "Suivez-nous sur",
                        " ",
                        react_1["default"].createElement("a", { href: "https://www.facebook.com/profile.php?id=61555657774462", target: "_blank", rel: "noopener noreferrer", className: "text-link" }, "Facebook"),
                        " ",
                        "et activez les notifications pour ne rien manquer."),
                    react_1["default"].createElement("div", { className: "section3-text" },
                        react_1["default"].createElement("strong", null, "Nos Collections :"),
                        react_1["default"].createElement("ul", { className: "collection-list" },
                            react_1["default"].createElement("li", null, "Nouveaut\u00E9s Mode : Restez \u00E0 la pointe de la mode avec nos derni\u00E8res arriv\u00E9es."),
                            react_1["default"].createElement("li", null, "V\u00EAtements Femme : Robes, tops, pantalons pour sublimer votre style."),
                            react_1["default"].createElement("li", null, "V\u00EAtements Homme : Un look moderne et \u00E9l\u00E9gant."),
                            react_1["default"].createElement("li", null, "V\u00EAtements Enfants : Pour les enfants de 0 \u00E0 12 ans."),
                            react_1["default"].createElement("li", null, "Accessoires de Mode : Sacs, bijoux, \u00E9charpes pour parfaire votre tenue.")))),
                react_1["default"].createElement("div", { className: "cta-area" },
                    react_1["default"].createElement("p", { className: "section3-text-cta" }, "Prochain Live : lundi 20h30 !"),
                    react_1["default"].createElement("a", { className: "calendar-link", href: "/calendrier.ics", download: true },
                        react_1["default"].createElement("span", { className: "calendar-icon-wrapper" },
                            react_1["default"].createElement(fc_1.FcCalendar, { className: "calendar-icon" })),
                        "Ajouter \u00E0 mon calendrier"))),
            react_1["default"].createElement("div", { className: "section3-right", style: { backgroundImage: "url('/images/hook2/hook2-2.png')" } })),
        react_1["default"].createElement("section", { ref: desktopRefs.section4 },
            react_1["default"].createElement("div", { className: "section4" }, showMasonry && react_1["default"].createElement(MasonryGridGallery, null)),
            react_1["default"].createElement("div", { ref: desktopRefs.section41, className: "reassurance" },
                react_1["default"].createElement(ReassuranceSection_1["default"], null))),
        react_1["default"].createElement("div", { ref: desktopRefs.section5, className: "section6" },
            react_1["default"].createElement(CarouselComments_1.CarouselComments, null)),
        isAdmin && (react_1["default"].createElement("div", { className: "mt-8" },
            react_1["default"].createElement("h2", { className: "text-2xl font-bold mb-4" }, "Ajouter un Commentaire"),
            react_1["default"].createElement(CommentForm_1["default"], null))),
        react_1["default"].createElement("div", { ref: desktopRefs.section51, className: "section7" },
            react_1["default"].createElement("div", { className: "section7-left" },
                react_1["default"].createElement(image_1["default"], { src: "/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png", alt: "Meilleure boutique de mode en ligne", width: 400, height: 400, quality: 80, loading: "lazy" })),
            react_1["default"].createElement("div", { className: "section7-right" },
                react_1["default"].createElement(SubscriberForm_1["default"], null),
                react_1["default"].createElement("p", { style: { cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }, onClick: handleUnsubscribeModal }, "Se d\u00E9sabonner de la newsletter"))),
        react_1["default"].createElement("div", { style: { height: "100px" } }))); };
    // Rendu pour la version Mobile, en utilisant mobileRefs du hook
    var MobileView = function () { return (react_1["default"].createElement("div", { ref: mobileRefs.animationM },
        react_1["default"].createElement("section", { ref: mobileRefs.section1M, className: "section1" },
            react_1["default"].createElement("div", { className: "section1-div" },
                react_1["default"].createElement(image_1["default"], { src: "/images/s-boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34-2.jpg", alt: "Live shopping Facebook Mode pas ch\u00E8re en ligne", fill: true, style: { objectFit: "cover" }, quality: 100, loading: "lazy" })),
            react_1["default"].createElement("div", { ref: mobileRefs.section1Content, className: "section1-content font-aboreto" },
                react_1["default"].createElement("h1", { className: "section1-title tracking-wide" }, "Bienvenue sur Chic'Mixt"),
                react_1["default"].createElement("div", { className: "content-hook" },
                    react_1["default"].createElement("div", { className: "section1-left" },
                        react_1["default"].createElement("p", { className: "section1-description", style: { color: "#de277b" } }, "Live shopping tous les lundis \u00E0 partir de 20h30"),
                        react_1["default"].createElement("p", { className: "section1-description" }, "Plongez dans l'univers de la mode tendance avec notre boutique de v\u00EAtements en live.")),
                    react_1["default"].createElement("div", { className: "section1-right" },
                        react_1["default"].createElement("p", { style: { width: "100%" }, className: "section1-description" }, "Nous proposons une large s\u00E9lection de v\u00EAtements femme, homme, enfant et accessoires de mode pour tous les styles et toutes les occasions."))))),
        react_1["default"].createElement("section", { ref: mobileRefs.section2M, className: "section2M" },
            react_1["default"].createElement("div", { className: "section2M-facebook enter-animation", ref: mobileRefs.imageRef1M },
                react_1["default"].createElement(FacebookLiveVideoMobile_1["default"], null)),
            react_1["default"].createElement("div", { className: "section2M-content" },
                react_1["default"].createElement("div", { className: "content-box", ref: mobileRefs.contentBoxM },
                    react_1["default"].createElement("a", { href: "https://www.facebook.com/profile.php?id=61555657774462", target: "_blank", rel: "noopener noreferrer" },
                        react_1["default"].createElement("div", { className: "logo-fb-container", ref: mobileRefs.imageRefFB },
                            react_1["default"].createElement(image_1["default"], { className: "logo-fb-img", src: "/images/Facebook-logo-chicMixt.jpeg", alt: "Facebook V\u00EAtements en ligne Live Chic'mixt", width: 80, height: 80, loading: "lazy" }),
                            react_1["default"].createElement("h1", { className: "enter-animation", ref: mobileRefs.section2MTitle1 }, "RETROUVEZ-NOUS EN LIVE SUR FACEBOOK"))),
                    react_1["default"].createElement("p", { className: "enter-animation" }, "Rejoignez-nous lors de nos lives shopping Facebook pour d\u00E9couvrir en exclusivit\u00E9 nos nouveaut\u00E9s et profiter d\u2019offres sp\u00E9ciales.")),
                react_1["default"].createElement("div", { className: "share" },
                    react_1["default"].createElement("span", { className: "share-text enter-animation" }, "Partagez \u00E0 vos amis et profitez des bons plans Mode Chic'Mixt sur vos r\u00E9seaux pr\u00E9f\u00E9r\u00E9s !"),
                    react_1["default"].createElement(ReactShare, { iconSize: 40 })))),
        react_1["default"].createElement("section", { ref: mobileRefs.section3M, className: "section3M" },
            react_1["default"].createElement("div", { className: "info-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow section3M-content enter-animation" },
                react_1["default"].createElement("h2", { className: "section3-title" }, "\u2728 Vente de v\u00EAtements et accessoires en Direct tous les lundis soir \u2728"),
                react_1["default"].createElement("p", { className: "section3-text enter-animation", ref: mobileRefs.section3Ma },
                    react_1["default"].createElement("strong", null, "Rejoignez-nous pour des lives pleins de joie et de fous rires."),
                    react_1["default"].createElement("br", null),
                    "Venez vous d\u00E9tendre avec Chic'Mixt et d\u00E9couvrez notre collection \u00E0 tout petit prix !"),
                react_1["default"].createElement("p", { className: "section3-text enter-animation" },
                    react_1["default"].createElement("strong", null, "Comment Participer : "),
                    react_1["default"].createElement("br", null),
                    "Suivez-nous sur",
                    " ",
                    react_1["default"].createElement("a", { href: "https://www.facebook.com/profile.php?id=61555657774462", target: "_blank", rel: "noopener noreferrer", className: "text-link" }, "Facebook"),
                    " ",
                    "et activez les notifications pour ne rien manquer."),
                react_1["default"].createElement("div", { className: "section3-text enter-animation" },
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement("strong", null, "Nos Collections :")),
                    react_1["default"].createElement("ul", { className: "collection-list" },
                        react_1["default"].createElement("li", { className: "enter-animation" }, "Nouveaut\u00E9s Mode : Restez \u00E0 la pointe de la mode avec nos derni\u00E8res arriv\u00E9es."),
                        react_1["default"].createElement("li", { className: "enter-animation" }, "V\u00EAtements Femme : Robes, tops, pantalons pour sublimer votre style."),
                        react_1["default"].createElement("li", { className: "enter-animation" }, "V\u00EAtements Homme : Un look moderne et \u00E9l\u00E9gant."),
                        react_1["default"].createElement("li", { className: "enter-animation" }, "V\u00EAtements Enfants : Pour les enfants de 0 \u00E0 12 ans."),
                        react_1["default"].createElement("li", { className: "enter-animation" }, "Accessoires de Mode : Sacs, bijoux, \u00E9charpes pour parfaire votre tenue."))),
                react_1["default"].createElement("div", { className: "cta-area" },
                    react_1["default"].createElement("p", { className: "section3-text-cta enter-animation" }, "Prochain Live : lundi 20h30 !"),
                    react_1["default"].createElement("a", { className: "calendar-link enter-animation", href: "/calendrier.ics", download: true },
                        react_1["default"].createElement("span", { className: "calendar-icon-wrapper" },
                            react_1["default"].createElement(fc_1.FcCalendar, { className: "calendar-icon" })),
                        "Ajouter \u00E0 mon calendrier")))),
        react_1["default"].createElement("section", { ref: mobileRefs.section4M },
            react_1["default"].createElement("div", { className: "section4M" }, showMasonry && react_1["default"].createElement(MasonryGridGallery, null)),
            react_1["default"].createElement("div", { ref: mobileRefs.section41M, className: "reassurance mt-12 enter-animation" },
                react_1["default"].createElement(ReassuranceSection_1["default"], null))),
        react_1["default"].createElement("div", { ref: mobileRefs.section5M, className: "section5M enter-animation" },
            react_1["default"].createElement(CarouselComments_1.CarouselComments, null)),
        react_1["default"].createElement("div", { ref: mobileRefs.section51M, className: "section51M" },
            react_1["default"].createElement("div", { className: "section51M-left" },
                react_1["default"].createElement(image_1["default"], { src: "/images/boutique-live-chicmixt-vetement-herault-34-newsletter.png", alt: "Meilleure boutique de mode en ligne", width: 80, height: 80, quality: 80, loading: "lazy" })),
            react_1["default"].createElement("div", { className: "section51M-right enter-animation" },
                react_1["default"].createElement(SubscriberForm_1["default"], null),
                react_1["default"].createElement("p", { style: { cursor: "pointer", fontStyle: "italic", marginTop: "10px", opacity: "0.6" }, onClick: handleUnsubscribeModal }, "Se d\u00E9sabonner de la newsletter"))),
        react_1["default"].createElement("div", { style: { height: "100px" } }))); };
    return react_1["default"].createElement(react_1["default"].Fragment, null, !isMobile ? react_1["default"].createElement(DesktopView, null) : react_1["default"].createElement(MobileView, null));
}
exports["default"] = Home;
