"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router.get('/me', AuthController_1.Me);
router.post('/login', AuthController_1.Login);
router.delete('/logout', AuthController_1.Logout);
exports.default = router;
