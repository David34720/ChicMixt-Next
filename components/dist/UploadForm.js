"use client";
"use strict";
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
var react_2 = require("next-auth/react");
var ModalContext_1 = require("../contexts/ModalContext");
function UploadForm(_a) {
    var _this = this;
    var refreshImages = _a.refreshImages;
    var closeModal = react_1.useContext(ModalContext_1.ModalContext).closeModal;
    var session = react_2.useSession().data;
    // Vérification de type pour session.user
    var user = session === null || session === void 0 ? void 0 : session.user;
    var _b = react_1.useState(null), image = _b[0], setImage = _b[1];
    var _c = react_1.useState(""), title = _c[0], setTitle = _c[1];
    var _d = react_1.useState(""), description = _d[0], setDescription = _d[1];
    var _e = react_1.useState(""), uploadStatus = _e[0], setUploadStatus = _e[1];
    if (!session) {
        return (React.createElement("div", null,
            React.createElement("p", null, "Vous devez \u00EAtre connect\u00E9 pour uploader des images."),
            React.createElement("button", { onClick: function () { return react_2.signIn(); } }, "Se connecter")));
    }
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
        return React.createElement("p", null, "Vous n'avez pas les permissions pour uploader des images.");
    }
    // Gestion du changement d'image
    var handleImageChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setImage(file);
        }
    };
    // Gestion de la soumission du formulaire
    var handleSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formData, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!image) {
                        setUploadStatus("Veuillez sélectionner une image.");
                        return [2 /*return*/];
                    }
                    formData = new FormData();
                    formData.append("image", image);
                    formData.append("title", title);
                    formData.append("description", description);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/upload", {
                            method: "POST",
                            body: formData
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    closeModal();
                    refreshImages();
                    setUploadStatus("Image uploadée avec succès !");
                    console.log("Résultat :", result);
                    return [3 /*break*/, 5];
                case 4:
                    setUploadStatus("Erreur lors de l'upload.");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Erreur :", error_1);
                    setUploadStatus("Erreur de connexion au serveur.");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "upload-form" },
        React.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "title" }, "Titre :"),
                React.createElement("input", { id: "title", type: "text", value: title, onChange: function (e) { return setTitle(e.target.value); }, className: "border rounded p-2 w-full" })),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "description" }, "Description :"),
                React.createElement("textarea", { id: "description", value: description, onChange: function (e) { return setDescription(e.target.value); }, className: "border rounded p-2 w-full" })),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "image" }, "Image :"),
                React.createElement("input", { id: "image", type: "file", accept: "image/*", onChange: handleImageChange, className: "border rounded p-2 w-full" })),
            React.createElement("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600" }, "Upload")),
        uploadStatus && (React.createElement("div", { className: "mt-4 text-center text-red-500" }, uploadStatus))));
}
exports["default"] = UploadForm;
