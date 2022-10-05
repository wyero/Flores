import express from 'express'
import cors from 'cors'
import session from 'express-session'
import UserRoute from './routes/UserRoute'
import AuthRoute from './routes/AuthRoute'
import ImageRoute from './routes/ImageRoute'
import fileUpload from 'express-fileupload'
import TourRoute from './routes/TourRoute'
import CountTourRoute from './routes/CountToureRoute'
import CountImageRoute from './routes/CountImageRoute'
import CountMessageRoute from './routes/CountMessageRoute'
import MessageRoute from './routes/MessageRoute'
import CountUserRoute from './routes/CountUserRoute'
import dotenv from 'dotenv'
const db = require("./models")
dotenv.config()

const app = express()

db.sequelize.sync()

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto"
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(fileUpload())
app.use(express.static("public"))
app.use(UserRoute)
app.use(AuthRoute)
app.use(ImageRoute)
app.use(TourRoute)
app.use(MessageRoute)
app.use(CountTourRoute)
app.use(CountImageRoute)
app.use(CountMessageRoute)
app.use(CountUserRoute)

app.listen(process.env.APP_PORT, () => {
    console.log("Server Running")
})