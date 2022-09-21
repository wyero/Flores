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
exports.deleteTour = exports.updateTour = exports.createTour = exports.getTourById = exports.getTour = void 0;
const db = require('../models');
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.TourModel.findAll({});
        res.json(response);
    }
    catch (error) {
        console.log({ msg: error.message });
    }
});
exports.getTour = getTour;
const getTourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db.TourModel.findOne({
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
exports.getTourById = getTourById;
const createTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files === null)
        return res.status(400).json({ msg: "Gambar Belum Di Masukkan" });
    const { nama, harga, lokasi, desksingkat, desklengkap } = req.body;
    const file = req.files.file;
    const file2 = req.files.file2;
    const file3 = req.files.file3;
    const ext = path_1.default.extname(file.name);
    const ext2 = path_1.default.extname(file2.name);
    const ext3 = path_1.default.extname(file3.name);
    const fileName = file.md5 + ext;
    const fileName2 = file2.md5 + ext2;
    const fileName3 = file3.md5 + ext3;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    const url3 = `${req.protocol}://${req.get("host")}/images/${fileName3}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Format Gambar Tidak Sesuai" });
    file.mv(`./public/images/${fileName}`);
    file2.mv(`./public/images/${fileName2}`);
    file3.mv(`./public/images/${fileName3}`);
    try {
        yield db.TourModel.create({
            nama: nama,
            harga: harga,
            lokasi: lokasi,
            desksingkat: desksingkat,
            desklengkap: desklengkap,
            gambar: fileName,
            gambar1: fileName2,
            gambar2: fileName3,
            url: url,
            url1: url2,
            url2: url3
        });
        res.status(200).json({ msg: "Tempat Wisata Berhasil Di Tambah" });
    }
    catch (error) {
        console.log({ msg: error.message });
    }
});
exports.createTour = createTour;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield db.TourModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!tour)
        res.status(400).json({ msg: "Tempat Wisata Tidak Ditemukan" });
    let fileName = "";
    let fileName2 = "";
    let fileName3 = "";
    if (req.files === null || req.files === "") {
        fileName = db.TourModel.gambar;
        fileName2 = db.TourModel.gambar1;
        fileName3 = db.TourModel.gambar2;
    }
    else {
        const file = req.files.file;
        const file2 = req.files.file2;
        const file3 = req.files.file3;
        const ext = path_1.default.extname(file.name);
        const ext2 = path_1.default.extname(file2.name);
        const ext3 = path_1.default.extname(file3.name);
        fileName = file.md5 + ext;
        fileName2 = file2.md5 + ext2;
        fileName3 = file3.md5 + ext3;
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Format Gambar Tidak Sesuai" });
        const filePath = `./public/images/${tour.gambar}`;
        const filePath2 = `./public/images/${tour.gambar1}`;
        const filePath3 = `./public/images/${tour.gambar2}`;
        fs_1.default.unlinkSync(filePath);
        fs_1.default.unlinkSync(filePath2);
        fs_1.default.unlinkSync(filePath3);
        file.mv(`./public/images/${fileName}`);
        file2.mv(`./public/images/${fileName2}`);
        file3.mv(`./public/images/${fileName3}`);
    }
    const { nama, harga, lokasi, desksingkat, desklengkap } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    const url3 = `${req.protocol}://${req.get("host")}/images/${fileName3}`;
    try {
        yield db.TourModel.update({
            nama: nama,
            harga: harga,
            lokasi: lokasi,
            desksingkat: desksingkat,
            desklengkap: desklengkap,
            gambar: fileName,
            gambar1: fileName2,
            gambar2: fileName3,
            url: url,
            url1: url2,
            url2: url3
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Tempat Wisata Berhasil Di Update" });
    }
    catch (error) {
        console.log({ msg: error.message });
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield db.TourModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!tour)
        return res.status(404).json({ msg: "Gambar Tidak DItemukan" });
    try {
        const filePath = `./public/images/${tour.gambar}`;
        const filePath2 = `./public/images/${tour.gambar1}`;
        const filePath3 = `./public/images/${tour.gambar2}`;
        fs_1.default.unlinkSync(filePath);
        fs_1.default.unlinkSync(filePath2);
        fs_1.default.unlinkSync(filePath3);
        yield db.TourModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Tempat Wisata Berhasil Dihapus" });
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.deleteTour = deleteTour;
