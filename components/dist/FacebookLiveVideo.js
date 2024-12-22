"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function FacebookLiveVideo(_a) {
    var videoUrl = _a.videoUrl, _b = _a.fallbackImageUrl, fallbackImageUrl = _b === void 0 ? "/images/hook2/hook2-1.png" : _b;
    var _c = react_1.useState(false), isSafari = _c[0], setIsSafari = _c[1];
    var _d = react_1.useState(false), isClient = _d[0], setIsClient = _d[1];
    react_1.useEffect(function () {
        // Le composant est monté côté client
        setIsClient(true);
        // Détecter Safari au montage client
        if (typeof navigator !== "undefined") {
            var ua = navigator.userAgent;
            var isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);
            setIsSafari(isSafariBrowser);
        }
        // Initialiser le plugin Facebook si présent et pas Safari
        if (typeof window !== "undefined" && window.FB && !isSafari) {
            window.FB.XFBML.parse();
        }
    }, [isSafari]);
    react_1.useEffect(function () {
        window.FB.XFBML.parse();
    }, [isClient]);
    // Avant que isClient soit true, on retourne un placeholder pour avoir un rendu stable.
    if (!isClient) {
        return (react_1["default"].createElement("div", { style: {
                width: "100%",
                height: "90%",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#f0f0f0"
            } }, "Chargement..."));
    }
    // Côté client, on peut désormais afficher la vidéo ou l'image selon le navigateur
    return (react_1["default"].createElement(react_1["default"].Fragment, null, !isSafari ? (react_1["default"].createElement("div", { className: "fb-video", "data-href": videoUrl, "data-allowfullscreen": "true", style: {
            width: "100%",
            height: "90%",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden"
        } })) : (react_1["default"].createElement("div", { style: {
            width: "100%",
            height: "90%",
            borderRadius: "20px",
            overflow: "hidden"
        } },
        react_1["default"].createElement("img", { src: fallbackImageUrl, alt: "Image de remplacement si la vid\u00E9o ne fonctionne pas", style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                objectPosition: "top"
            } })))));
}
exports["default"] = FacebookLiveVideo;
