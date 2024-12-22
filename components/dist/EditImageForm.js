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
function EditImageForm(_a) {
    var image = _a.image, onSuccess = _a.onSuccess;
    var session = react_2.useSession().data;
    var _b = react_1.useState(image.title), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(image.description), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(""), error = _e[0], setError = _e[1];
    // Vérifiez la session avant de permettre la soumission
    if (!session) {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("p", null, "Vous devez \u00EAtre connect\u00E9 pour modifier les images."),
            react_1["default"].createElement("button", { onClick: function () { return react_2.signIn(); } }, "Se connecter")));
    }
    var user = session.user;
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
        return react_1["default"].createElement("p", null, "Vous n'avez pas les permissions pour modifier les images.");
    }
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        setLoading(true);
                        setError("");
                        console.log("session", session);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        return [4 /*yield*/, fetch("/api/images", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    id: image.id,
                                    title: title,
                                    description: description
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        throw new Error(data.error || "Erreur lors de la mise à jour.");
                    case 4:
                        // Success => on peut éventuellement fermer la modale ou rafraîchir la liste
                        onSuccess();
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _a.sent();
                        setError(err_1.message || "Erreur inconnue.");
                        return [3 /*break*/, 7];
                    case 6:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement("div", { className: "flex flex-col items-center p-4" },
        react_1["default"].createElement("img", { src: image.url, alt: "edit-image-" + image.id, className: "rounded mb-4", style: { maxWidth: "200px", height: "auto" } }),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "w-full flex flex-col gap-2" },
            error && react_1["default"].createElement("p", { className: "text-red-500" }, error),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { htmlFor: "title", className: "block font-medium" }, "Titre"),
                react_1["default"].createElement("input", { id: "title", name: "title", className: "border border-gray-300 rounded w-full px-2 py-1", value: title, onChange: function (e) { return setTitle(e.target.value); } })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { htmlFor: "description", className: "block font-medium" }, "Description"),
                react_1["default"].createElement("textarea", { id: "description", name: "description", className: "border border-gray-300 rounded w-full px-2 py-1", rows: 3, value: description, onChange: function (e) { return setDescription(e.target.value); } })),
            react_1["default"].createElement("button", { type: "submit", disabled: loading, className: "bg-blue-500 text-white px-4 py-2 rounded mt-2" }, loading ? "Mise à jour..." : "Mettre à jour"))));
}
exports["default"] = EditImageForm;
