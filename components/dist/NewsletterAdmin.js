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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var sanitize_html_1 = require("sanitize-html");
var react_hook_form_1 = require("react-hook-form");
var yup = require("yup");
var yup_1 = require("@hookform/resolvers/yup");
var react_2 = require("@tiptap/react");
var starter_kit_1 = require("@tiptap/starter-kit");
var extension_image_1 = require("@tiptap/extension-image");
var extension_link_1 = require("@tiptap/extension-link");
var extension_text_style_1 = require("@tiptap/extension-text-style");
var extension_text_align_1 = require("@tiptap/extension-text-align");
var extension_color_1 = require("@tiptap/extension-color");
var extension_underline_1 = require("@tiptap/extension-underline");
var fa_1 = require("react-icons/fa");
// Validation schema with Yup
var schema = yup.object().shape({
    subject: yup
        .string()
        .required("L'objet de la newsletter est requis.")
        .min(5, "L'objet doit contenir au moins 5 caractères."),
    content: yup
        .string()
        .required("Le contenu de la newsletter est requis.")
});
function NewsletterAdmin() {
    var _this = this;
    var _a = react_1.useState(false), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var _b = react_1.useState(null), status = _b[0], setStatus = _b[1];
    var _c = react_1.useState(false), displayColorPicker = _c[0], setDisplayColorPicker = _c[1];
    var _d = react_1.useState("#000000"), currentColor = _d[0], setCurrentColor = _d[1];
    var _e = react_1.useState(false), displayBackgroundColorPicker = _e[0], setDisplayBackgroundColorPicker = _e[1];
    var _f = react_1.useState("#ffffff"), currentBackgroundColor = _f[0], setCurrentBackgroundColor = _f[1];
    var _g = react_hook_form_1.useForm({
        resolver: yup_1.yupResolver(schema)
    }), register = _g.register, handleSubmit = _g.handleSubmit, setValue = _g.setValue, errors = _g.formState.errors;
    // Initialize TipTap editor with necessary extensions
    var editor = react_2.useEditor({
        extensions: [
            starter_kit_1["default"],
            extension_underline_1["default"],
            extension_image_1["default"],
            extension_link_1["default"].configure({
                openOnClick: false
            }),
            extension_text_style_1["default"],
            extension_color_1["default"].configure({
                types: ["textStyle"]
            }),
            extension_text_align_1["default"].configure({
                types: ["heading", "paragraph"]
            }),
        ],
        content: "",
        onUpdate: function (_a) {
            var editor = _a.editor;
            var html = editor.getHTML();
            setValue("content", html);
        },
        editable: true,
        immediatelyRender: false
    });
    var handleTextColor = function (color) {
        if (editor) {
            editor.chain().focus().setColor(color).run();
        }
    };
    var handleBackgroundColor = function (color) {
        if (editor) {
            editor.chain().focus().setMark("textStyle", { "background-color": color }).run();
        }
    };
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var sanitizedContent, finalHtmlContent, response, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    sanitizedContent = sanitize_html_1["default"](data.content, {
                        allowedTags: sanitize_html_1["default"].defaults.allowedTags.concat(["img", "a"]),
                        allowedAttributes: __assign(__assign({}, sanitize_html_1["default"].defaults.allowedAttributes), { a: ["href", "target", "rel"], img: ["src", "alt", "width", "height"] })
                    });
                    finalHtmlContent = "\n        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:" + currentBackgroundColor + ";\">\n          <tr>\n            <td>\n              " + sanitizedContent + "\n            </td>\n          </tr>\n        </table>\n      ";
                    return [4 /*yield*/, fetch("/api/send-newsletter", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ subject: data.subject, content: finalHtmlContent })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    setStatus("Newsletter envoyée avec succès !");
                    setValue("subject", "");
                    editor === null || editor === void 0 ? void 0 : editor.commands.setContent("");
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    error = (_a.sent()).error;
                    setStatus(error || "Une erreur est survenue.");
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error("Erreur :", error_1);
                    setStatus("Une erreur inconnue est survenue.");
                    return [3 /*break*/, 8];
                case 7:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleImageUpload = react_1.useMemo(function () {
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var input;
            var _this = this;
            return __generator(this, function (_a) {
                input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();
                input.onchange = function () { return __awaiter(_this, void 0, void 0, function () {
                    var file, formData, response, url, error_2;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
                                if (!(file && editor)) return [3 /*break*/, 7];
                                formData = new FormData();
                                formData.append("image", file);
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 6, , 7]);
                                return [4 /*yield*/, fetch("/api/uploadNewsletterPict", {
                                        method: "POST",
                                        body: formData
                                    })];
                            case 2:
                                response = _b.sent();
                                if (!response.ok) return [3 /*break*/, 4];
                                return [4 /*yield*/, response.json()];
                            case 3:
                                url = (_b.sent()).url;
                                editor.chain().focus().setImage({ src: url }).run();
                                return [3 /*break*/, 5];
                            case 4:
                                console.error("Erreur lors de l'upload de l'image.");
                                _b.label = 5;
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                error_2 = _b.sent();
                                console.error("Erreur réseau lors de l'upload de l'image.", error_2);
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/];
            });
        }); };
    }, [editor]);
    var menuBar = react_1.useMemo(function () { return [
        [
            { icon: react_1["default"].createElement(fa_1.FaBold, null), name: "bold", action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().toggleBold().run(); } },
            { icon: react_1["default"].createElement(fa_1.FaItalic, null), name: "italic", action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().toggleItalic().run(); } },
            { icon: react_1["default"].createElement(fa_1.FaUnderline, null), name: "underline", action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().toggleUnderline().run(); } },
            { icon: react_1["default"].createElement(fa_1.FaStrikethrough, null), name: "strike", action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().toggleStrike().run(); } },
        ],
        [
            { name: "textAlign", align: "left", icon: react_1["default"].createElement(fa_1.FaAlignLeft, null), action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().setTextAlign("left").run(); } },
            { name: "textAlign", align: "center", icon: react_1["default"].createElement(fa_1.FaAlignCenter, null), action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().setTextAlign("center").run(); } },
            { name: "textAlign", align: "right", icon: react_1["default"].createElement(fa_1.FaAlignRight, null), action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().setTextAlign("right").run(); } },
            { name: "textAlign", align: "justify", icon: react_1["default"].createElement(fa_1.FaAlignJustify, null), action: function () { return editor === null || editor === void 0 ? void 0 : editor.chain().focus().setTextAlign("justify").run(); } },
        ],
        [
            { name: "heading", icon: react_1["default"].createElement(fa_1.FaHeading, null), attrs: { level: 1 } },
            { name: "heading", icon: react_1["default"].createElement(fa_1.FaHeading, null), attrs: { level: 2 } },
            { name: "heading", icon: react_1["default"].createElement(fa_1.FaHeading, null), attrs: { level: 3 } },
        ],
        [
            { icon: react_1["default"].createElement(fa_1.FaListUl, null), name: "bulletList" },
            { icon: react_1["default"].createElement(fa_1.FaListOl, null), name: "orderedList" },
            { icon: react_1["default"].createElement(fa_1.FaQuoteRight, null), name: "blockquote" },
        ],
        [
            { icon: react_1["default"].createElement(fa_1.FaLink, null), name: "link", action: function () { return console.log("Link action"); } },
            { icon: react_1["default"].createElement(fa_1.FaImage, null), name: "image", action: handleImageUpload },
        ],
    ]; }, [editor, handleImageUpload]);
    return (react_1["default"].createElement("div", { className: "max-w-4xl mx-auto p-6 grid grid-cols-1 gap-y-6 gap-x-4 form-newsletter" },
        react_1["default"].createElement("h1", { className: "text-2xl font-bold mb-4" }, "Cr\u00E9er une Newsletter"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { htmlFor: "subject", className: "block text-sm font-medium mb-1" }, "Objet"),
                react_1["default"].createElement("input", __assign({ type: "text", id: "subject" }, register("subject"), { className: "w-full border rounded px-3 py-2 " + (errors.subject ? "border-red-500" : "border-gray-300"), placeholder: "Objet de la newsletter" })),
                errors.subject && (react_1["default"].createElement("p", { className: "text-red-500 text-sm" }, errors.subject.message))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_2.EditorContent, { editor: editor, className: "editor prose min-h-[200px] p-2" })),
            react_1["default"].createElement("button", { type: "submit", disabled: isSubmitting, className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400" }, isSubmitting ? "Envoi en cours..." : "Envoyer la Newsletter")),
        status && (react_1["default"].createElement("div", { className: "mt-4 " + (status.includes("succès") ? "text-green-500" : "text-red-500") }, status))));
}
exports["default"] = NewsletterAdmin;
