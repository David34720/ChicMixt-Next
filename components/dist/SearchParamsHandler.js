"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var ModalContext_1 = require("../contexts/ModalContext");
var UnsubscribeModal_1 = require("./UnsubscribeModal");
function SearchParamsHandler() {
    var searchParams = navigation_1.useSearchParams();
    var _a = react_1.useContext(ModalContext_1.ModalContext), openModal = _a.openModal, closeModal = _a.closeModal;
    react_1.useEffect(function () {
        var showUnsubscribeModal = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get("showUnsubscribeModal");
        if (showUnsubscribeModal === "true") {
            openModal(React.createElement(UnsubscribeModal_1["default"], { onClose: closeModal }));
            // Supprimer le paramètre de l'URL
            var newSearchParams = new URLSearchParams(searchParams === null || searchParams === void 0 ? void 0 : searchParams.toString());
            newSearchParams["delete"]("showUnsubscribeModal");
            var newUrl = window.location.pathname + "?" + newSearchParams.toString();
            window.history.replaceState(null, "", newUrl);
        }
    }, [searchParams, openModal, closeModal]);
    return null; // Ce composant ne rend rien
}
exports["default"] = SearchParamsHandler;
