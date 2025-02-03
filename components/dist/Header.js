"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var AppWrapper_1 = require("./AppWrapper");
var ModalContext_1 = require("../contexts/ModalContext");
var link_1 = require("next/link");
var ContactModal_1 = require("../components/ContactModal");
var AproposModal_1 = require("../components/AproposModal");
var Login_1 = require("../components/Login");
var Header = function (_a) {
    var isScrolled = _a.isScrolled;
    var navigateToSection = AppWrapper_1.useSectionContext().navigateToSection;
    var openModal = react_1.useContext(ModalContext_1.ModalContext).openModal;
    var _b = react_2.useSession(), session = _b.data, status = _b.status;
    var _c = react_1.useState(false), isSessionLoaded = _c[0], setIsSessionLoaded = _c[1];
    react_1.useEffect(function () {
        if (status !== "loading") {
            setIsSessionLoaded(true); // Indique que la session est chargée
        }
    }, [status]);
    if (!isSessionLoaded) {
        return react_1["default"].createElement("div", null, "Loading..."); // Afficher un loading tant que la session n'est pas chargée
    }
    var handleLoginClick = function () {
        openModal(react_1["default"].createElement(Login_1["default"], null));
    };
    var handleContactModal = function () {
        openModal(react_1["default"].createElement(ContactModal_1["default"], null));
    };
    var handleAproposModal = function () {
        openModal(react_1["default"].createElement(AproposModal_1["default"], null));
    };
    var adminPage = function () {
        navigation_1.redirect("/admin/admin-page");
    };
    return (react_1["default"].createElement("header", { className: "header transition-all duration-300 \n      " + (isScrolled ? 'h-26 bg-blur transition duration-500 ease-in-out' : 'h-32 bg-0 transition duration-500 ease-in-out') },
        react_1["default"].createElement("nav", { className: 'nav' },
            !isScrolled && (react_1["default"].createElement("div", { className: "logo logo-xl " },
                react_1["default"].createElement("span", { className: "logo-txt" }, "Chic'Mixt"))),
            isScrolled && (react_1["default"].createElement("div", { className: "logo logo-xs " },
                react_1["default"].createElement("span", { className: "logo-txt" }, "Chic'Mixt"))),
            session ? (react_1["default"].createElement("div", { className: "login admin" },
                react_1["default"].createElement("button", { onClick: function () { return react_2.signOut(); } },
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }))),
                (session === null || session === void 0 ? void 0 : session.user.role) === "admin" && (react_1["default"].createElement("button", { onClick: adminPage }, "Admin")))) : (react_1["default"].createElement("div", { className: "login" },
                react_1["default"].createElement("button", { onClick: handleLoginClick },
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }))))),
            react_1["default"].createElement("ul", null,
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("button", { className: "dekstop", onClick: function () { return navigateToSection(2); } }, "D\u00E9couvrir")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("button", { onClick: function () { return handleAproposModal(); } }, "\u00C0 propos")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("button", { onClick: function () { return handleContactModal(); } }, "Contact")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(link_1["default"], { href: "/HookHomePage" }, "HookHomePage"))))));
};
exports["default"] = Header;
