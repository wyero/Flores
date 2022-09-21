"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ImageController_1 = require("../controllers/ImageController");
const AuthUser_1 = require("../middleware/AuthUser");
const router = express_1.default.Router();
router.get('/images', ImageController_1.getImage);
router.get('/images/:id', AuthUser_1.verifyUser, AuthUser_1.admin, ImageController_1.getImageById);
router.post('/images', AuthUser_1.verifyUser, AuthUser_1.admin, ImageController_1.saveImage);
router.delete('/images/:id', AuthUser_1.verifyUser, AuthUser_1.admin, ImageController_1.deleteImage);
exports.default = router;
