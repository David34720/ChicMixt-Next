//https://github.com/nygardk/react-share#readme
"use client";
"use strict";
exports.__esModule = true;
exports.ReactShare = void 0;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var react_share_1 = require("react-share");
var exampleImage = '/images/boutique-live-chicmixt-facebook-vente-vetement-fanny-herault-34.webp';
function ReactShare(_a) {
    var iconSize = _a.iconSize;
    var shareUrl = 'https://www.facebook.com/profile.php?id=61555657774462';
    var title = 'La meilleure boutique de mode en live Facebook';
    var _b = react_1.useState(false), copied = _b[0], setCopied = _b[1];
    var handleCopy = function () {
        navigator.clipboard.writeText(shareUrl)
            .then(function () {
            setCopied(true);
            setTimeout(function () { return setCopied(false); }, 2000); // Masquer le message après 2s
        })["catch"](function (err) { return console.error('Failed to copy text: ', err); });
    };
    return (react_1["default"].createElement("div", { className: "Demo__container" },
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement("button", { onClick: handleCopy, "aria-label": "Copier le lien de cette page", className: "network__share-button", style: { color: 'deeppink', border: 'none', background: 'transparent', cursor: 'pointer' } },
                react_1["default"].createElement(fa_1.FaCopy, { size: iconSize })),
            copied && react_1["default"].createElement("span", { style: { marginLeft: '10px', color: 'green' } }, "Lien copi\u00E9!")),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.TwitterShareButton, { url: shareUrl, title: title, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.XIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.TelegramShareButton, { url: shareUrl, title: title, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.TelegramIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.WhatsappShareButton, { url: shareUrl, title: title, separator: ":: ", className: "network__share-button" },
                react_1["default"].createElement(react_share_1.WhatsappIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network " },
            react_1["default"].createElement(react_share_1.LinkedinShareButton, { url: shareUrl, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.LinkedinIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.PinterestShareButton, { url: shareUrl, media: "" + exampleImage, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.PinterestIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.RedditShareButton, { url: shareUrl, title: title, windowWidth: 660, windowHeight: 460, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.RedditIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.TumblrShareButton, { url: shareUrl, title: title, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.TumblrIcon, { size: iconSize, round: true }))),
        react_1["default"].createElement("div", { className: "network" },
            react_1["default"].createElement(react_share_1.EmailShareButton, { url: shareUrl, subject: title, body: title, className: "network__share-button" },
                react_1["default"].createElement(react_share_1.EmailIcon, { size: iconSize, round: true })))));
}
exports.ReactShare = ReactShare;
