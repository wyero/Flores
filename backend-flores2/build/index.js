"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const ImageRoute_1 = __importDefault(require("./routes/ImageRoute"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const TourRoute_1 = __importDefault(require("./routes/TourRoute"));
const CountToureRoute_1 = __importDefault(require("./routes/CountToureRoute"));
const CountImageRoute_1 = __importDefault(require("./routes/CountImageRoute"));
const CountMessageRoute_1 = __importDefault(require("./routes/CountMessageRoute"));
const MessageRoute_1 = __importDefault(require("./routes/MessageRoute"));
const CountUserRoute_1 = __importDefault(require("./routes/CountUserRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const db = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
db.sequelize.sync();
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto"
    }
}));
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static("public"));
app.use(UserRoute_1.default);
app.use(AuthRoute_1.default);
app.use(ImageRoute_1.default);
app.use(TourRoute_1.default);
app.use(MessageRoute_1.default);
app.use(CountToureRoute_1.default);
app.use(CountImageRoute_1.default);
app.use(CountMessageRoute_1.default);
app.use(CountUserRoute_1.default);
app.listen(process.env.APP_PORT, () => {
    console.log("Server Running");
});
