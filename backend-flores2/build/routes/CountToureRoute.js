"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CountTourController_1 = require("../controllers/CountTourController");
const AuthUser_1 = require("../middleware/AuthUser");
const router = express_1.default.Router();
router.get('/count-tour', AuthUser_1.verifyUser, AuthUser_1.admin, CountTourController_1.dataCount);
exports.default = router;