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
exports.deleteUsers = exports.updateUsers = exports.createUsers = exports.getUsersById = exports.getUsers = void 0;
const argon2_1 = __importDefault(require("argon2"));
const db = require('../models');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.UserModel.findAll({
            attributes: ['id', 'nama', 'email', 'role']
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.UserModel.findOne({
            attributes: ['id', 'nama', 'email', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.getUsersById = getUsersById;
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nama, email, password, ulangiPassword, role } = req.body;
    if (password !== ulangiPassword)
        return res.status(400).json({ msg: "Password Dan Ulangi Password Tidak Cocok" });
    const hashPassword = yield argon2_1.default.hash(password);
    try {
        yield db.UserModel.create({
            nama: nama,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "Admin Berhasil Ditambah" });
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.createUsers = createUsers;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.UserModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user)
        return res.status(404).json({ msg: "Admin Tidak Ditemukan" });
    const { nama, email, password, ulangiPassword, role } = req.body;
    let hash;
    if (password === '' || password === null) {
        hash = user.password;
    }
    else {
        hash = yield argon2_1.default.hash(password);
    }
    if (password !== ulangiPassword)
        return res.status(400).json({ msg: "Password Dan Ulangi Password Tidak Cocok" });
    try {
        yield db.UserModel.update({
            nama: nama,
            email: email,
            password: hash,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Admin Berhasil Diupdate" });
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.UserModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user)
        return res.status(400).json({ msg: "Admin Tidak Ditemukan" });
    try {
        yield db.UserModel.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Admin Berhasil Dihapus" });
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.deleteUsers = deleteUsers;
