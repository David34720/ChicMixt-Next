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
// api/images/index.ts
var client_1 = require("../../../prisma/client");
var react_1 = require("next-auth/react");
var next_1 = require("next-auth/next");
var ____nextauth_1 = require("../auth/[...nextauth]");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var method, _a, images, error_1, session, _b, title, description, url, newImage, error_2, session, _c, id, title, description, numericId, updatedImage, error_3, session, id, error_4, error_5;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    method = req.method;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 22, , 23]);
                    _a = method;
                    switch (_a) {
                        case 'GET': return [3 /*break*/, 2];
                        case 'POST': return [3 /*break*/, 6];
                        case 'PUT': return [3 /*break*/, 11];
                        case 'DELETE': return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 20];
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client_1["default"].image.findMany({
                            orderBy: { position: "asc" }
                        })];
                case 3:
                    images = _d.sent();
                    res.status(200).json(images);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _d.sent();
                    if (error_1 instanceof Error) {
                        console.error("Erreur lors de la récupération des images :", error_1.message);
                        res.status(500).json({ error: 'Erreur lors de la récupération des images.' });
                    }
                    else {
                        console.error("Erreur inconnue :", error_1);
                        res.status(500).json({ error: 'Erreur inconnue.' });
                    }
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 21];
                case 6:
                    _d.trys.push([6, 9, , 10]);
                    return [4 /*yield*/, next_1.getServerSession(req, res, ____nextauth_1.authOptions)];
                case 7:
                    session = _d.sent();
                    if (!session || !session.user || session.user.role !== "admin") {
                        return [2 /*return*/, res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." })];
                    }
                    _b = req.body, title = _b.title, description = _b.description, url = _b.url;
                    if (!title || !url) {
                        return [2 /*return*/, res.status(400).json({ error: 'Titre et URL obligatoires.' })];
                    }
                    return [4 /*yield*/, client_1["default"].image.create({
                            data: {
                                title: title,
                                description: description || "",
                                url: url
                            }
                        })];
                case 8:
                    newImage = _d.sent();
                    res.status(201).json(newImage);
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _d.sent();
                    if (error_2 instanceof Error) {
                        console.error("Erreur lors de l'ajout de l'image :", error_2.message);
                        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'image.' });
                    }
                    else {
                        console.error("Erreur inconnue :", error_2);
                        res.status(500).json({ error: 'Erreur inconnue.' });
                    }
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 21];
                case 11:
                    _d.trys.push([11, 14, , 15]);
                    return [4 /*yield*/, next_1.getServerSession(req, res, ____nextauth_1.authOptions)];
                case 12:
                    session = _d.sent();
                    console.log("session", session);
                    if (!session || !session.user || session.user.role !== "admin") {
                        return [2 /*return*/, res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." })];
                    }
                    _c = req.body, id = _c.id, title = _c.title, description = _c.description;
                    if (!id || !title) {
                        return [2 /*return*/, res.status(400).json({ error: "ID et Titre obligatoires pour la mise à jour." })];
                    }
                    numericId = parseInt(id, 10);
                    if (isNaN(numericId)) {
                        return [2 /*return*/, res.status(400).json({ error: "ID invalide" })];
                    }
                    return [4 /*yield*/, client_1["default"].image.update({
                            where: { id: numericId },
                            data: {
                                title: title,
                                description: description || ""
                            }
                        })];
                case 13:
                    updatedImage = _d.sent();
                    return [2 /*return*/, res.status(200).json(updatedImage)];
                case 14:
                    error_3 = _d.sent();
                    console.error("Erreur lors de la mise à jour de l'image :", error_3);
                    return [2 /*return*/, res.status(500).json({ error: "Erreur lors de la mise à jour de l'image." })];
                case 15:
                    _d.trys.push([15, 18, , 19]);
                    return [4 /*yield*/, react_1.getSession({ req: req })];
                case 16:
                    session = _d.sent();
                    console.log("session", session);
                    if (!session || !session.user || session.user.role !== "admin") {
                        return [2 /*return*/, res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." })];
                    }
                    id = req.query.id;
                    if (!id || Array.isArray(id) || isNaN(parseInt(id, 10))) {
                        return [2 /*return*/, res.status(400).json({ error: 'ID valide obligatoire pour supprimer une image.' })];
                    }
                    return [4 /*yield*/, client_1["default"].image["delete"]({
                            where: { id: parseInt(id, 10) }
                        })];
                case 17:
                    _d.sent();
                    res.status(204).end(); // Pas de contenu, suppression réussie
                    return [3 /*break*/, 19];
                case 18:
                    error_4 = _d.sent();
                    if (error_4 instanceof Error) {
                        console.error("Erreur lors de la suppression de l'image :", error_4.message);
                        res.status(500).json({ error: 'Erreur lors de la suppression de l\'image.' });
                    }
                    else {
                        console.error("Erreur inconnue :", error_4);
                        res.status(500).json({ error: 'Erreur inconnue.' });
                    }
                    return [3 /*break*/, 19];
                case 19: return [3 /*break*/, 21];
                case 20:
                    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                    res.status(405).end("M\u00E9thode " + method + " non autoris\u00E9e");
                    _d.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    error_5 = _d.sent();
                    if (error_5 instanceof Error) {
                        console.error("Erreur globale :", error_5.message);
                        res.status(500).json({ error: "Erreur serveur." });
                    }
                    else {
                        console.error("Erreur inconnue :", error_5);
                        res.status(500).json({ error: "Erreur inconnue." });
                    }
                    return [3 /*break*/, 23];
                case 23: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = handler;
