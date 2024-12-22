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
var ModalContext_1 = require("../contexts/ModalContext");
var UploadForm_1 = require("../components/UploadForm");
var react_masonry_css_1 = require("react-masonry-css");
var image_1 = require("next/image");
var gsap_1 = require("gsap");
var react_2 = require("next-auth/react");
var EditImageForm_1 = require("../components/EditImageForm");
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var SortableItem_1 = require("./SortableItem");
var MasonryGridGallery = function () {
    var openModal = react_1.useContext(ModalContext_1.ModalContext).openModal;
    var session = react_2.useSession().data;
    var _a = react_1.useState([]), images = _a[0], setImages = _a[1];
    var _b = react_1.useState(null), error = _b[0], setError = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    /** Toggle local pour activer/désactiver le drag & drop **/
    var _d = react_1.useState(false), isDragEnabled = _d[0], setIsDragEnabled = _d[1];
    var cardsRef = react_1.useRef([]);
    var isAdmin = (session === null || session === void 0 ? void 0 : session.user) && session.user.role === "admin";
    var sensors = core_1.useSensors(core_1.useSensor(core_1.PointerSensor), core_1.useSensor(core_1.KeyboardSensor, {
        coordinateGetter: sortable_1.sortableKeyboardCoordinates
    }));
    /** Récupération des images en base **/
    react_1.useEffect(function () {
        var fetchImages = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("/api/images")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (Array.isArray(data)) {
                            setImages(data);
                        }
                        else {
                            setError("Les données récupérées ne sont pas un tableau.");
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Erreur lors de la récupération des images :", err_1);
                        setError("Erreur lors de la récupération des images.");
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchImages();
    }, []);
    /** Animation GSAP lors de l’apparition des images **/
    react_1.useEffect(function () {
        if (!images.length)
            return;
        gsap_1.gsap.set(cardsRef.current, { opacity: 0, y: 50 });
        var tl = gsap_1.gsap.timeline();
        tl.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out"
        });
        return function () {
            tl.kill();
        };
    }, [images]);
    /** Suppression d'une image **/
    var handleDeleteImage = function (imageId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, errorRes, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
                        return [2 /*return*/];
                    }
                    console.log("click - delete image", imageId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/images?id=" + imageId, {
                            method: "DELETE"
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    setImages(function (prev) { return prev.filter(function (img) { return img.id !== imageId; }); });
                    alert("Image supprimée avec succès.");
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    errorRes = _a.sent();
                    alert("Erreur lors de la suppression : " + errorRes.message);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_2 = _a.sent();
                    console.error("Erreur lors de la suppression de l'image :", err_2);
                    alert("Une erreur est survenue.");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    /** Ouverture du formulaire d’upload **/
    var handleFormUpload = function () {
        openModal(react_1["default"].createElement(UploadForm_1["default"], { refreshImages: refreshImages }));
    };
    /** Rafraîchir la liste des images **/
    var refreshImages = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/images")];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (Array.isArray(data)) {
                        setImages(data);
                    }
                    else {
                        setError("Les données récupérées ne sont pas un tableau.");
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_3 = _a.sent();
                    console.error("Erreur lors de la récupération des images :", err_3);
                    setError("Erreur lors de la récupération des images.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    /** Affichage de l’image en grand (Modale) **/
    var handleImageClick = function (image) {
        if (!isAdmin) {
            openModal(react_1["default"].createElement("div", { className: "flex flex-col items-center" },
                react_1["default"].createElement(image_1["default"], { src: image.url, alt: "gallery-photo-" + image.id, width: 800, height: 600, className: "rounded-lg" }),
                react_1["default"].createElement("h2", { className: "mt-4 text-center" }, image.title),
                react_1["default"].createElement("p", { className: "mt-4 text-center" }, image.description),
                react_1["default"].createElement("p", { className: "mt-4 text-center" },
                    "ID : ",
                    image.id)));
        }
        else {
            openModal(react_1["default"].createElement("div", { className: "flex flex-col items-center" },
                react_1["default"].createElement(image_1["default"], { src: image.url, alt: "gallery-photo-" + image.id, width: 200, height: 200, className: "rounded-lg" }),
                react_1["default"].createElement(EditImageForm_1["default"], { image: image, onSuccess: function () {
                        // Recharger la liste (optionnel) si on veut voir la maj en direct
                        refreshImages();
                    } })));
        }
    };
    /** Gestion du drag & drop => reorder **/
    var handleDragEnd = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var active, over, oldIndex, newIndex, newImages, orderedIds, response, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    active = event.active, over = event.over;
                    if (!over)
                        return [2 /*return*/]; // si le drop est hors de la zone
                    if (!(active.id !== over.id)) return [3 /*break*/, 4];
                    oldIndex = images.findIndex(function (img) { return img.id === Number(active.id); });
                    newIndex = images.findIndex(function (img) { return img.id === Number(over.id); });
                    newImages = sortable_1.arrayMove(images, oldIndex, newIndex);
                    setImages(newImages);
                    orderedIds = newImages.map(function (img) { return img.id; });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/images/reorder", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                            body: JSON.stringify({ orderedIds: orderedIds })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Erreur lors de la mise à jour de l'ordre des images.");
                    }
                    console.log("Ordre mis à jour avec succès.");
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.error(err_4);
                    alert("Une erreur est survenue lors de la mise à jour de l'ordre des images.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /** Configuration du Masonry **/
    var breakpoints = {
        "default": 5,
        1024: 4,
        768: 3,
        480: 2
    };
    /** Gestion des erreurs **/
    if (error) {
        return react_1["default"].createElement("div", null, error);
    }
    /** Loader si data en cours de chargement **/
    if (loading) {
        return (react_1["default"].createElement("div", { className: "flex items-center justify-center h-screen" },
            react_1["default"].createElement("div", { className: "spinner" })));
    }
    // --- Mode Admin ---
    if (isAdmin) {
        return (react_1["default"].createElement("div", { className: "masonry-gallery" },
            react_1["default"].createElement("div", { className: "flex items-center gap-4 mb-4" },
                react_1["default"].createElement("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", onClick: handleFormUpload }, "Upload"),
                react_1["default"].createElement("label", { className: "inline-flex items-center cursor-pointer select-none" },
                    react_1["default"].createElement("input", { type: "checkbox", className: "sr-only peer", checked: isDragEnabled, onChange: function () { return setIsDragEnabled(!isDragEnabled); } }),
                    react_1["default"].createElement("div", { className: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" }),
                    react_1["default"].createElement("span", { className: "ml-2 text-sm font-medium text-gray-900" }, isDragEnabled ? "Déplacement : Activé" : "Déplacement : Désactivé"))),
            isDragEnabled ? (react_1["default"].createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
                react_1["default"].createElement(sortable_1.SortableContext, { items: images.map(function (image) { return image.id; }), strategy: sortable_1.verticalListSortingStrategy },
                    react_1["default"].createElement(react_masonry_css_1["default"], { breakpointCols: breakpoints, className: "my-masonry-grid", columnClassName: "my-masonry-grid_column" }, images.map(function (image, index) { return (react_1["default"].createElement(SortableItem_1["default"], { key: image.id, id: image.id },
                        react_1["default"].createElement("div", { className: "card-gallery relative", ref: function (el) {
                                if (el)
                                    cardsRef.current[index] = el;
                            } },
                            react_1["default"].createElement(image_1["default"], { src: image.url, alt: "Accessoires-vetement-mode-femme-enfant-tendance-" + image.id, width: 400, height: 600, className: "rounded-lg object-cover hover:opacity-80 transition", onClick: function () { return handleImageClick(image); }, loading: "lazy" })))); }))))) : (
            // Drag désactivé : on affiche simplement le Masonry
            react_1["default"].createElement(react_masonry_css_1["default"], { breakpointCols: breakpoints, className: "my-masonry-grid", columnClassName: "my-masonry-grid_column" }, images.map(function (image, index) { return (react_1["default"].createElement("div", { key: image.id, className: "card-gallery relative", ref: function (el) {
                    if (el)
                        cardsRef.current[index] = el;
                } },
                react_1["default"].createElement(image_1["default"], { src: image.url, alt: "Accessoires-vetement-mode-femme-enfant-tendance-" + image.id, width: 400, height: 600, className: "rounded-lg object-cover hover:opacity-80 transition", onClick: function () { return handleImageClick(image); }, loading: "lazy" }),
                react_1["default"].createElement("button", { className: "absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded", onClick: function (e) {
                        e.stopPropagation();
                        handleDeleteImage(image.id);
                    } }, "Suppr"))); })))));
    }
    // --- Mode non-admin ---
    return (react_1["default"].createElement("div", { className: "masonry-gallery" },
        react_1["default"].createElement(react_masonry_css_1["default"], { breakpointCols: breakpoints, className: "my-masonry-grid", columnClassName: "my-masonry-grid_column" }, images.map(function (image, index) { return (react_1["default"].createElement("div", { key: image.id, className: "card-gallery relative", ref: function (el) {
                if (el)
                    cardsRef.current[index] = el;
            } },
            react_1["default"].createElement(image_1["default"], { src: image.url, alt: "gallery-photo-" + image.id, width: 400, height: 600, className: "rounded-lg object-cover hover:opacity-80 transition", onClick: function () { return handleImageClick(image); }, loading: "lazy" }))); }))));
};
exports["default"] = MasonryGridGallery;
