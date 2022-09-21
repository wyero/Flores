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
exports.deleteImage = exports.saveImage = exports.getImageById = exports.getImage = void 0;
const db = require('../models');
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.ImageModel.findAll();
        res.json(response);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getImage = getImage;
const getImageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.ImageModel.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getImageById = getImageById;
const saveImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files === null)
        return res.status(400).json({ msg: "Gambar Belum Di Masukkan" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path_1.default.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Format Gambar Tidak Sesuai" });
    if (fileSize > 10000000)
        return res.status(422).json({ msg: "Ukuran Gambar Harus Lebih Kecil Dari 10 MB" });
    file.mv(`./public/images/${fileName}`);
    try {
        yield db.ImageModel.create({
            gambar: fileName,
            url: url
        });
        res.status(200).json({ msg: "Gambar Berhasil Disimpan" });
    }
    catch (error) {
        console.log({ msg: error.message });
    }
});
exports.saveImage = saveImage;
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield db.ImageModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!image)
        res.status(404).json({ msg: "Gambar Tidak Ditemukan" });
    try {
        const filePath = `./public/images/${image.gambar}`;
        fs_1.default.unlinkSync(filePath);
        yield db.ImageModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Gambar Berhasil Dihapus" });
    }
    catch (error) {
        console.log({ msg: error.message });
    }
});
exports.deleteImage = deleteImage;
