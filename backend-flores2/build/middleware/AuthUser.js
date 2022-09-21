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
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.verifyUser = void 0;
const db = require("../models");
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Silahkan Login Terlebih Dahulu" });
    }
    const user = yield db.UserModel.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user)
        return res.status(404).json({ msg: "Admin Tidak Ditemukan" });
    req.userId = user.id;
    req.role = user.role;
    next();
});
exports.verifyUser = verifyUser;
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.UserModel.findOne({
        where: {
            id: req.session.userId
        }
    });
    if (!user)
        return res.status(404).json({ msg: "Admin Tidak Ditemukan" });
    if (user.role !== "Admin" && user.role !== "Admin Utama")
        return res.status(403).json({ msg: "Akses Ditolak" });
    next();
});
exports.admin = admin;
