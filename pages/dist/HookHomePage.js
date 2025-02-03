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
    // État pour le scale (zoom arrière initial)
    var _c = react_1.useState(1.4), bgScale = _c[0], setBgScale = _c[1];
    // État pour le blur (flou au démarrage)
    var _d = react_1.useState(5), bgBlur = _d[0], setBgBlur = _d[1]; // 10 = 10px de flou initial
    // === 1) Animer le scale de l’image de fond et le blur sur 2s au chargement ===
    react_1.useEffect(function () {
        var startTime = 0;
        var duration = 1500; // 2 secondes
        function animateZoom(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1); // entre 0 et 1
            // De scale(3.4) à scale(1.0) => écart de 2.4
            var newScale = 3.4 - 2.4 * progress;
            setBgScale(newScale);
            // De blur(10px) à blur(0px)
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
        var x = e.clientX - innerWidth / 2;
        var y = e.clientY - innerHeight / 2;
        var bgX = -x / 10;
        var bgY = -y / 10;
        var rotateX = y / 10;
        var rotateY = -x / 60;
        setBgOffset({ x: bgX, y: bgY });
        setPhoneRotation({ x: rotateX, y: rotateY });
    }
    return (React.createElement("div", { className: HookHomePage_module_scss_1["default"].container, onMouseMove: handleMouseMove },
        React.createElement(image_1["default"], { src: "/images/HookHomePage/DALL\u00B7E2025-02-0120.42.17-Showroom-Next_Chicmixt.webp", alt: "Showroom", fill: true, priority: true, className: HookHomePage_module_scss_1["default"].bgImage, style: {
                transform: "translate(" + bgOffset.x + "px, " + bgOffset.y + "px) scale(" + bgScale + ")",
                filter: "blur(" + bgBlur + "px)"
            } }),
        React.createElement("div", { className: HookHomePage_module_scss_1["default"].phoneWrapper, style: {
                transform: "\n            translate(-50%, 0) \n            rotateX(" + phoneRotation.x + "deg) \n            rotateY(" + phoneRotation.y + "deg)\n          "
            } },
            React.createElement("div", { className: HookHomePage_module_scss_1["default"].phoneContainer },
                React.createElement(image_1["default"], { src: "/images/HookHomePage/mochup_Chicmixt-live.png", alt: "Smartphone mockup", width: 300, height: 600, className: HookHomePage_module_scss_1["default"].phoneImg }),
                React.createElement(image_1["default"], { src: "/images/HookHomePage/Live-mockup-Chicmixt-Hook-3.gif", alt: "GIF in phone screen", width: 300, height: 600, className: HookHomePage_module_scss_1["default"].phoneScreen })))));
}
exports["default"] = HookHomePage;
