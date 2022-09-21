"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MessageController_1 = require("../controllers/MessageController");
const AuthUser_1 = require("../middleware/AuthUser");
const router = express_1.default.Router();
router.get('/message', AuthUser_1.verifyUser, AuthUser_1.admin, MessageController_1.getMessage);
router.get('/message/:id', AuthUser_1.verifyUser, AuthUser_1.admin, MessageController_1.getMessageById);
router.post('/message', MessageController_1.createMessage);
router.delete('/message/:id', AuthUser_1.verifyUser, AuthUser_1.admin, MessageController_1.deleteMessage);
exports.default = router;