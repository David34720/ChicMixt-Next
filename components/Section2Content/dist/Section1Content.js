"use strict";
exports.__esModule = true;
var Section1Content_module_scss_1 = require("./Section1Content.module.scss");
var react_1 = require("react");
var Section1Content = function (_a) {
    var handleSectionClickPlus = _a.handleSectionClickPlus;
    var section1Content = react_1.useRef(null);
    console.log('styles', Section1Content_module_scss_1["default"]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: section1Content, className: Section1Content_module_scss_1["default"].section1Content },
            React.createElement("h1", { className: Section1Content_module_scss_1["default"].section1Title }, "Shopping Live"),
            React.createElement("p", { className: Section1Content_module_scss_1["default"].section1Description }, "Tendance & Offres Exclusives !"),
            React.createElement("button", { onClick: handleSectionClickPlus, "aria-label": "Aller \u00E0 la section suivante, d\u00E9couvrir Chic'mixt", className: Section1Content_module_scss_1["default"].button }, "D\u00E9couvrir"))));
};
exports["default"] = Section1Content;
