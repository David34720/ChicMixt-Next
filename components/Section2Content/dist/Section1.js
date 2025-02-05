"use strict";
exports.__esModule = true;
var Section1_module_scss_1 = require("./Section1.module.scss");
var react_1 = require("react");
var Section1 = function (_a) {
    var handleSectionClickPlus = _a.handleSectionClickPlus;
    var section1 = react_1.useRef(null);
    var section1Content = react_1.useRef(null);
    return (React.createElement("div", { ref: section1Content, className: Section1_module_scss_1["default"].section1Content },
        React.createElement("h1", { className: Section1_module_scss_1["default"].section1Title }, "Shopping Live"),
        React.createElement("p", { className: Section1_module_scss_1["default"].section1Description }, "Tendance & Offres Exclusives en Live !"),
        React.createElement("button", { onClick: handleSectionClickPlus, "aria-label": "Aller \u00E0 la section suivante, d\u00E9couvrir Chic'mixt" }, "D\u00E9couvrir")));
};
exports["default"] = Section1;
