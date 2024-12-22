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
exports.config = void 0;
var multer_1 = require("multer");
var path_1 = require("path");
var fs_1 = require("fs");
var client_1 = require("../prisma/client"); // Assurez-vous que ce chemin est correct
var sharp_1 = require("sharp");
var react_1 = require("next-auth/react");
// Configurer le dossier de destination
var upload = multer_1["default"]({
    storage: multer_1["default"].diskStorage({
        destination: function (req, file, cb) { return __awaiter(void 0, void 0, void 0, function () {
            var uploadPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadPath = path_1["default"].join(process.cwd(), "public/uploads/newsletter");
                        return [4 /*yield*/, fs_1.promises.mkdir(uploadPath, { recursive: true })];
                    case 1:
                        _a.sent();
                        cb(null, uploadPath);
                        return [2 /*return*/];
                }
            });
        }); },
        filename: function (req, file, cb) {
            var uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        }
    }),
    fileFilter: function (req, file, cb) {
        var allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Type de fichier non autorisé."));
        }
    }
});
// Middleware pour gérer l'upload avec Next.js
var uploadMiddleware = upload.single("image");
// Configuration de Next.js pour désactiver le body parser pour l'upload
exports.config = {
    api: {
        bodyParser: false
    }
};
function handler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var session, file, optimizedPath, newImage, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, react_1.getSession({ req: req })];
                case 1:
                    session = _b.sent();
                    if (!session || ((_a = session.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
                        return [2 /*return*/, res.status(401).json({ error: "Non autorisé" })];
                    }
                    if (!(req.method === "POST")) return [3 /*break*/, 6];
                    // Utiliser Multer pour traiter le fichier uploadé
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            uploadMiddleware(req, res, function (err) {
                                if (err)
                                    reject(err);
                                else
                                    resolve();
                            });
                        })];
                case 2:
                    // Utiliser Multer pour traiter le fichier uploadé
                    _b.sent();
                    file = req.file;
                    if (!file) {
                        return [2 /*return*/, res.status(400).json({ error: "Aucun fichier uploadé." })];
                    }
                    optimizedPath = path_1["default"].join(process.cwd(), "public/uploads/newsletter", "optimized-" + file.filename);
                    return [4 /*yield*/, sharp_1["default"](file.path)
                            .resize(800) // Largeur maximale
                            .jpeg({ quality: 80 }) // Compression JPEG
                            .toFile(optimizedPath)];
                case 3:
                    _b.sent();
                    // Supprimer l'image originale
                    return [4 /*yield*/, fs_1.promises.unlink(file.path)];
                case 4:
                    // Supprimer l'image originale
                    _b.sent();
                    return [4 /*yield*/, client_1["default"].imageNewsLetter.create({
                            data: {
                                url: "/uploads/newsletter/optimized-" + file.filename
                            }
                        })];
                case 5:
                    newImage = _b.sent();
                    res.status(201).json(newImage);
                    return [3 /*break*/, 7];
                case 6:
                    res.setHeader("Allow", ["POST"]);
                    res.status(405).end("M\u00E9thode " + req.method + " non autoris\u00E9e");
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    console.error("Erreur lors de l'upload :", error_1);
                    res.status(500).json({ error: "Erreur lors de l'upload." });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = handler;
