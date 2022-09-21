"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TourController_1 = require("../controllers/TourController");
const AuthUser_1 = require("../middleware/AuthUser");
const router = express_1.default.Router();
router.get('/tours', TourController_1.getTour);
router.get('/tours/:id', TourController_1.getTourById);
router.post('/tours', AuthUser_1.verifyUser, AuthUser_1.admin, TourController_1.createTour);
router.patch('/tours/:id', AuthUser_1.verifyUser, AuthUser_1.admin, TourController_1.updateTour);
router.delete('/tours/:id', AuthUser_1.verifyUser, AuthUser_1.admin, TourController_1.deleteTour);
exports.default = router;
