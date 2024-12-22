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
function Login() {
    var _this = this;
    var closeModal = react_1.useContext(ModalContext_1.ModalContext).closeModal;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var form, email, password, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    form = e.currentTarget;
                    email = form.elements.namedItem("email").value;
                    password = form.elements.namedItem("password").value;
                    return [4 /*yield*/, react_2.signIn("credentials", {
                            email: email,
                            password: password,
                            redirect: false
                        })];
                case 1:
                    result = _a.sent();
                    if (result === null || result === void 0 ? void 0 : result.error) {
                        console.error("Erreur de connexion:", result.error);
                        alert("Échec de la connexion. Vérifiez vos identifiants.");
                    }
                    else if (result === null || result === void 0 ? void 0 : result.ok) {
                        closeModal();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "flex flex-col items-center justify-center bg-gray-100" },
        React.createElement("h2", { className: "text-2xl font-bold mb-6" }, "Se connecter"),
        React.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-lg shadow-md" },
            React.createElement("input", { type: "email", name: "email", placeholder: "Email", required: true, className: "border border-gray-300 p-2 rounded" }),
            React.createElement("input", { type: "password", name: "password", placeholder: "Mot de passe", required: true, className: "border border-gray-300 p-2 rounded" }),
            React.createElement("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" }, "Se connecter"))));
}
exports["default"] = Login;
