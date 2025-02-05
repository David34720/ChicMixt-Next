"use strict";
exports.__esModule = true;
exports.useScrollEnterAnimation = void 0;
// hooks/useScrollEnterAnimation.ts
var react_1 = require("react");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
function useScrollEnterAnimation() {
    react_1.useEffect(function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
        var elements = gsap_1.gsap.utils.toArray(".enter-animation");
        var scrollTriggers = [];
        elements.forEach(function (el) {
            // Position de départ
            gsap_1.gsap.set(el, { opacity: 0, y: 90 });
            // Crée le timeline avec toggleActions
            var tl = gsap_1.gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 80%",
                    toggleActions: "restart none none none",
                    scrub: false
                }
            });
            tl.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });
            // On stocke le ScrollTrigger pour le cleanup
            if (tl.scrollTrigger) {
                scrollTriggers.push(tl.scrollTrigger);
            }
        });
        return function () {
            scrollTriggers.forEach(function (st) { return st.kill(); });
        };
    }, []);
}
exports.useScrollEnterAnimation = useScrollEnterAnimation;
