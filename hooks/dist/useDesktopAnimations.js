"use strict";
exports.__esModule = true;
exports.useDesktopAnimations = void 0;
// hooks/useDesktopAnimations.ts
var react_1 = require("react");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
function useDesktopAnimations(refs, setShowMasonry) {
    react_1.useEffect(function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
        var mm = gsap_1.gsap.matchMedia();
        // On se crée un tableau pour stocker les triggers créés
        var scrollTriggers = [];
        var section1 = refs.section1, section2 = refs.section2, section3 = refs.section3, section4 = refs.section4;
        mm.add("(min-width: 769px)", function () {
            // Section2 apparaît, Section1 disparaît
            if (section1.current && section2.current) {
                var tl1 = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section1.current,
                        start: "bottom bottom",
                        end: "bottom 200px",
                        scrub: true
                    }
                })
                    .fromTo(section2.current, { opacity: 0.7 }, { opacity: 1, duration: 1 });
                // On push le scrollTrigger associé
                if (tl1.scrollTrigger) {
                    scrollTriggers.push(tl1.scrollTrigger);
                }
                var tl2 = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section2.current,
                        start: "top center",
                        end: "top 200px",
                        scrub: true
                    }
                })
                    .to(section1.current, { opacity: 0, duration: 1 });
                if (tl2.scrollTrigger) {
                    scrollTriggers.push(tl2.scrollTrigger);
                }
            }
            // Section3 apparaît, Section2 disparaît
            if (section2.current && section3.current) {
                var tl3 = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section2.current,
                        start: "bottom bottom",
                        end: "bottom 200px",
                        scrub: true
                    }
                })
                    .fromTo(section3.current, { opacity: 0 }, { opacity: 1, duration: 1 });
                if (tl3.scrollTrigger) {
                    scrollTriggers.push(tl3.scrollTrigger);
                }
                var tl4 = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section3.current,
                        start: "top center",
                        end: "top 200px",
                        scrub: true
                    }
                })
                    .to(section2.current, { opacity: 0, duration: 1 });
                if (tl4.scrollTrigger) {
                    scrollTriggers.push(tl4.scrollTrigger);
                }
            }
            // ... Idem pour Section4 ...
            if (section3.current && section4.current) {
                var tl5 = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section3.current,
                        start: "bottom bottom",
                        end: "bottom 200px",
                        scrub: true
                    }
                })
                    .fromTo(section4.current, { opacity: 0 }, { opacity: 1, duration: 1 });
                if (tl5.scrollTrigger) {
                    scrollTriggers.push(tl5.scrollTrigger);
                }
                if (section3.current) {
                    // Timeline (ou direct) pour déclencher showMasonry = true quand top de section3 arrive au center
                    var tlShowMasonry = gsap_1.gsap.timeline({
                        scrollTrigger: {
                            trigger: section3.current,
                            start: "top center",
                            onEnter: function () {
                                // On set showMasonry à true
                                setShowMasonry(true);
                            },
                            // Optionnel: si tu veux que showMasonry repasse à false quand on remonte tout en haut
                            onLeaveBack: function () {
                                setShowMasonry(false);
                            }
                        }
                    });
                    if (tlShowMasonry.scrollTrigger) {
                        scrollTriggers.push(tlShowMasonry.scrollTrigger);
                    }
                }
                var tl6 = gsap_1.gsap.timeline({
                    scrollTrigger: {
                        trigger: section4.current,
                        start: "top center",
                        end: "top 200px",
                        scrub: true
                    }
                })
                    .to(section3.current, { opacity: 0, duration: 1 });
                if (tl6.scrollTrigger) {
                    scrollTriggers.push(tl6.scrollTrigger);
                }
            }
        });
        return function () {
            // On tue juste nos triggers et on revert le matchMedia
            scrollTriggers.forEach(function (st) { return st.kill(); });
            mm.revert();
        };
    }, [refs]);
}
exports.useDesktopAnimations = useDesktopAnimations;
