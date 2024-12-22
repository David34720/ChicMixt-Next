"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var fa_1 = require("react-icons/fa");
var react_2 = require("next-auth/react");
function SortableItem(_a) {
    var id = _a.id, children = _a.children;
    var session = react_2.useSession().data;
    var isAdmin = (session === null || session === void 0 ? void 0 : session.user) && session.user.role === "admin";
    var _b = sortable_1.useSortable({ id: id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition, isDragging = _b.isDragging;
    var style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition: transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "grab"
    };
    return (react_1["default"].createElement("div", __assign({ ref: setNodeRef, style: style }, attributes, listeners, { className: "relative" }),
        isAdmin && (react_1["default"].createElement(fa_1.FaGripVertical, { className: "absolute top-2 left-2 z-10 cursor-grab text-gray-500" })),
        children));
}
exports["default"] = SortableItem;
