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
exports.deleteMessage = exports.createMessage = exports.getMessageById = exports.getMessage = void 0;
const db = require('../models');
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.MessageModel.findAll();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.getMessage = getMessage;
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.MessageModel.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.getMessageById = getMessageById;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nama, email, nomortlpn, pesan } = req.body;
    const tanggal = new Date();
    try {
        yield db.MessageModel.create({
            nama: nama,
            email: email,
            nomortlpn: nomortlpn,
            pesan: pesan,
            tanggal: tanggal
        });
        res.status(200).json({ msg: "Pesan Terkirim" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.createMessage = createMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.MessageModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Pesan Berhasil Dihapus" });
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.deleteMessage = deleteMessage;
