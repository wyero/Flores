"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const AuthUser_1 = require("../middleware/AuthUser");
const router = express_1.default.Router();
router.get('/users', AuthUser_1.verifyUser, AuthUser_1.admin, UserController_1.getUsers);
router.get('/users/:id', AuthUser_1.verifyUser, AuthUser_1.admin, UserController_1.getUsersById);
router.post('/users', AuthUser_1.verifyUser, AuthUser_1.admin, UserController_1.createUsers);
router.patch('/users/:id', AuthUser_1.verifyUser, AuthUser_1.admin, UserController_1.updateUsers);
router.delete('/users/:id', AuthUser_1.verifyUser, AuthUser_1.admin, UserController_1.deleteUsers);
exports.default = router;
