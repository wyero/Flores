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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Me = exports.Login = void 0;
const argon2_1 = __importDefault(require("argon2"));
const db = require('../models');
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.UserModel.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user)
        return res.status(404).json({ msg: "Pengguna Tidak Ditemukan" });
    const pass = yield argon2_1.default.verify(user.password, req.body.password);
    if (!pass)
        return res.status(400).json({ msg: "Email atau Password Salah" });
    req.session.userId = user.id;
    const id = user.id;
    const nama = user.nama;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ id, nama, email, role });
});
exports.Login = Login;
const Me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Silahkan Login Terlebih Dahulu" });
    }
    const user = yield db.UserModel.findOne({
        attributes: ['id', 'nama', 'email', 'role'],
        where: {
            id: req.session.userId
        }
    });
    if (!user)
        return res.status(404).json({ msg: "Pengguna Tidak Ditemukan" });
    res.status(200).json(user);
});
exports.Me = Me;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err)
            return res.status(400).json({ msg: "Tidak Dapat Keluar" });
        res.status(200).json({ msg: "Logout Berhasil" });
    });
});
exports.Logout = Logout;
