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
exports.CarouselComments = void 0;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
function CarouselComments() {
    var _this = this;
    var _a = react_1.useState([]), comments = _a[0], setComments = _a[1];
    var _b = react_1.useState(null), error = _b[0], setError = _b[1];
    react_1.useEffect(function () {
        var fetchComments = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/comments")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        // Vérification si la réponse est bien un tableau
                        if (Array.isArray(data)) {
                            setComments(data);
                        }
                        else {
                            setError("Les données récupérées ne sont pas un tableau.");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Erreur lors de la récupération des commentaires :", error_1);
                        setError("Erreur lors de la récupération des commentaires.");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchComments();
    }, []);
    if (error) {
        return react_1["default"].createElement("div", null, error);
    }
    return (react_1["default"].createElement("section", { className: "mx-auto max-w-6xl mt-8 py-4 px-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow carousel-content " },
        react_1["default"].createElement("h2", { className: "text-2xl md:text-3xl font-bold text-center mb-4" }, "Nos clients parlent de nous"),
        react_1["default"].createElement("div", { className: "relative" },
            react_1["default"].createElement("div", { className: "flex space-x-6 overflow-x-scroll scrollbar-none scroll-snap-x p-4", style: {
                    scrollSnapType: "x mandatory"
                } }, comments.map(function (comment) { return (react_1["default"].createElement("div", { key: comment.id, className: "flex-shrink-0 w-64 md:w-72 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow scroll-snap-align-start" },
                react_1["default"].createElement("div", { className: "flex items-center mb-4" },
                    react_1["default"].createElement(fa_1.FaQuoteLeft, { className: "text-primary-500 mr-2 text-xl", style: { color: "#de277b" } }),
                    react_1["default"].createElement("h3", { className: "font-semibold" }, comment.commentorName)),
                react_1["default"].createElement("p", { className: "text-sm text-gray-700 mb-4 comment-message" }, comment.message),
                react_1["default"].createElement("div", { className: "text-xs text-gray-400" },
                    "Publi\u00E9 le ",
                    new Date(comment.createdAt).toLocaleDateString("fr-FR")))); })))));
}
exports.CarouselComments = CarouselComments;
