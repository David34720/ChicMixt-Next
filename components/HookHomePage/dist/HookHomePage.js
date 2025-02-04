"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var HookHomePage_module_scss_1 = require("./HookHomePage.module.scss");
function HookHomePage() {
    // État pour le décalage de la BG (parallaxe)
    var _a = react_1.useState({ x: 0, y: 0 }), bgOffset = _a[0], setBgOffset = _a[1];
    // État pour l’inclinaison du smartphone
    var _b = react_1.useState({ x: 0, y: 0 }), phoneRotation = _b[0], setPhoneRotation = _b[1];
    // État pour le décalage du téléphone (autour du centrage CSS)
    var _c = react_1.useState({ x: 0, y: 0 }), phoneOffset = _c[0], setPhoneOffset = _c[1];
    // État pour le scale (zoom arrière initial)
    var _d = react_1.useState(1.4), bgScale = _d[0], setBgScale = _d[1];
    // État pour le blur (flou au démarrage)
    var _e = react_1.useState(5), bgBlur = _e[0], setBgBlur = _e[1]; // part de 5px et finit à 0px
    // === 1) Animer le scale de l’image de fond et le blur sur 1,5s au chargement ===
    react_1.useEffect(function () {
        var startTime = 0;
        var duration = 2500;
        function animateZoom(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1); // 0 → 1
            // De scale(3.4) à scale(1.0)
            var newScale = 3.4 - 2.4 * progress;
            setBgScale(newScale);
            // De blur(5px) à blur(0px)
            var newBlur = 5 - 5 * progress;
            setBgBlur(newBlur);
            if (progress < 1) {
                requestAnimationFrame(animateZoom);
            }
        }
        requestAnimationFrame(animateZoom);
    }, []);
    // === 2) Gérer la parallaxe / rotation au mouvement de la souris ===
    function handleMouseMove(e) {
        var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
        // Distance entre la souris et le centre de l’écran
        var x = e.clientX - innerWidth / 2;
        var y = e.clientY - innerHeight / 2;
        // Parallaxe BG (déplacement dans le même sens que la souris)
        // Ajuste la division pour un effet plus ou moins fort
        var bgX = -x / 10;
        var bgY = -y / 10;
        // Rotation smartphone
        var rotateX = y / 10;
        var rotateY = -x / 60;
        // Décalage du téléphone (léger, dans le sens inverse ou non)
        // Ici, on va faire un mouvement inverse plus discret => -x/50
        // Ou x/50 si tu préfères le même sens
        var phoneX = (x / 10);
        // On peut aussi faire varier un peu la hauteur si on veut
        var phoneY = 0;
        setBgOffset({ x: bgX, y: bgY });
        setPhoneRotation({ x: rotateX, y: rotateY });
        setPhoneOffset({ x: phoneX, y: phoneY });
    }
    return (React.createElement("div", { className: HookHomePage_module_scss_1["default"].container, onMouseMove: handleMouseMove },
        React.createElement(image_1["default"], { src: "/images/HookHomePage/DALL\u00B7E2025-02-0120.42.17-Showroom-Next_Chicmixt.webp", alt: "Showroom", fill: true, priority: true, className: HookHomePage_module_scss_1["default"].bgImage, style: {
                transform: "translate(" + bgOffset.x + "px, " + bgOffset.y + "px) scale(" + bgScale + ")",
                filter: "blur(" + bgBlur + "px)"
            } }),
        React.createElement("div", { className: HookHomePage_module_scss_1["default"].phoneWrapper, style: {
                transform: "\n            translate(-50%, 0)\n            translate(" + phoneOffset.x + "px, " + phoneOffset.y + "px)\n            rotateX(" + phoneRotation.x + "deg) \n            rotateY(" + phoneRotation.y + "deg)\n          "
            } },
            React.createElement("div", { className: HookHomePage_module_scss_1["default"].phoneContainer },
                React.createElement(image_1["default"], { src: "/images/HookHomePage/mochup_Chicmixt-live.png", alt: "Smartphone mockup", width: 300, height: 600, className: HookHomePage_module_scss_1["default"].phoneImg }),
                React.createElement(image_1["default"], { src: "/images/HookHomePage/Live-mockup-Chicmixt-Hook-3.gif", alt: "GIF in phone screen", width: 300, height: 600, className: HookHomePage_module_scss_1["default"].phoneScreen })))));
}
exports["default"] = HookHomePage;
