"use strict";
exports.__esModule = true;
exports.useSectionRefs = void 0;
// hooks/useSectionRefs.ts
var react_1 = require("react");
function useSectionRefs() {
    var desktopRefs = {
        section1: react_1.useRef(null),
        section1Content: react_1.useRef(null),
        section2: react_1.useRef(null),
        section3: react_1.useRef(null),
        section4: react_1.useRef(null),
        section41: react_1.useRef(null),
        section5: react_1.useRef(null),
        section51: react_1.useRef(null),
        imageRefFB: react_1.useRef(null),
        imageRef1: react_1.useRef(null),
        contentBox: react_1.useRef(null),
        section2Title1: react_1.useRef(null),
        section3Title1: react_1.useRef(null)
    };
    var mobileRefs = {
        animationM: react_1.useRef(null),
        section1M: react_1.useRef(null),
        section2M: react_1.useRef(null),
        contentBoxM: react_1.useRef(null),
        imageRef1M: react_1.useRef(null),
        section2MTitle1: react_1.useRef(null),
        section3M: react_1.useRef(null),
        section3Ma: react_1.useRef(null),
        section4M: react_1.useRef(null),
        section41M: react_1.useRef(null),
        section5M: react_1.useRef(null),
        section51M: react_1.useRef(null)
    };
    return { desktopRefs: desktopRefs, mobileRefs: mobileRefs };
}
exports.useSectionRefs = useSectionRefs;
