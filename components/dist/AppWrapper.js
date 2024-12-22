"use client";
"use strict";
exports.__esModule = true;
exports.useSectionContext = void 0;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var script_1 = require("next/script");
var Modal_1 = require("./Modal");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
var SectionContext = react_1.createContext(null);
exports.useSectionContext = function () {
    var context = react_1.useContext(SectionContext);
    if (!context) {
        throw new Error("useSectionContext must be used within SectionContext.Provider");
    }
    return context;
};
function AppWrapper(_a) {
    var children = _a.children;
    var sectionsRef = react_1.useRef([]);
    var navigateToSection = function (index) {
        var section = sectionsRef.current[index];
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    var setSectionRef = function (index, ref) {
        sectionsRef.current[index] = ref;
    };
    react_1.useEffect(function () {
        if (typeof window !== "undefined") {
            window.fbAsyncInit = function () {
                window.FB.init({
                    xfbml: true,
                    version: "v21.0"
                });
            };
        }
    }, []);
    return (react_1["default"].createElement(react_2.SessionProvider, null,
        react_1["default"].createElement(SectionContext.Provider, { value: { navigateToSection: navigateToSection, setSectionRef: setSectionRef } },
            react_1["default"].createElement(Header_1["default"], { isScrolled: false }),
            react_1["default"].createElement("main", { className: "container mx-auto" },
                react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement("div", null, "Chargement...") }, children),
                react_1["default"].createElement(Modal_1["default"], null)),
            react_1["default"].createElement(Footer_1["default"], null),
            react_1["default"].createElement(script_1["default"], { async: true, defer: true, crossOrigin: "anonymous", src: "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v21.0" }))));
}
exports["default"] = AppWrapper;
