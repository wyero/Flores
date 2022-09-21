"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CountImageController_1 = require("../controllers/CountImageController");
const AuthUser_1 = require("../middleware/AuthUser");
const router = express_1.default.Router();
router.get('/count-image', AuthUser_1.verifyUser, AuthUser_1.admin, CountImageController_1.dataCount);
exports.default = router;
