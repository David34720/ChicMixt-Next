"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var useSectionRefs_1 = require("../../hooks/useSectionRefs");
var FacebookLiveVideo_1 = require("../../components/FacebookLiveVideo");
var ReactShare_1 = require("../../components/ReactShare");
var Section2Content = function (_a) {
    var handleSectionClickPlus = _a.handleSectionClickPlus;
    var section2Content = react_1.useRef(null);
    var desktopRefs = useSectionRefs_1.useSectionRefs().desktopRefs;
    var facebookVideoUrl = "https://fb.watch/xgvTdqbHcb/";
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "left-col enter-animation" },
            React.createElement("div", { className: "image-wrapper", ref: desktopRefs.imageRef1 },
                React.createElement(FacebookLiveVideo_1["default"], { videoUrl: facebookVideoUrl }))),
        React.createElement("div", { className: "right-col" },
            React.createElement("a", { href: "https://fb.watch/xgvTdqbHcb/", target: "_blank", rel: "noopener noreferrer" },
                React.createElement("div", { className: "content-box enter-animation", ref: desktopRefs.contentBox },
                    React.createElement("div", { className: "logo-fb-container", ref: desktopRefs.imageRefFB },
                        React.createElement(image_1["default"], { className: "logo-fb-img enter-animation", src: "/images/Facebook-logo-chicMixt.jpeg", alt: "Facebook V\u00EAtements en ligne Live Chic'mixt", width: 200, height: 200, loading: "lazy" })),
                    React.createElement("h2", { ref: desktopRefs.section2Title1, className: "enter-animation" }, "RETROUVEZ-NOUS EN LIVE SUR FACEBOOK"),
                    React.createElement("p", { className: "enter-animation" }, "Rejoignez-nous lors de nos lives shopping Facebook pour d\u00E9couvrir en exclusivit\u00E9 nos nouveaut\u00E9s et profiter d\u2019offres sp\u00E9ciales."))),
            React.createElement("div", { className: "share enter-animation" },
                React.createElement("span", { className: "share-text enter-animation" }, "Partagez \u00E0 vos amis et profitez des bons plans Mode Chic'Mixt sur vos r\u00E9seaux pr\u00E9f\u00E9r\u00E9s !"),
                React.createElement(ReactShare_1.ReactShare, { iconSize: 40 })))));
};
exports["default"] = Section2Content;
