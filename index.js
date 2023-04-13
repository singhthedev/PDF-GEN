import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
const MongoStore = require("connect-mongo")(session);
import * as dotenv from 'dotenv'
dotenv.config()
import './config/db'
const app = express();


import"./modules/passport";
import pdfRouter from "./routes/pdfRoute";
import indexRouter from "./routes/passportRoute";
import onBoardRout from './routes/onBoardRoute';

app.use(
  cookieSession({
    name: "session",
    keys: ["technogetic"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// session middelware
app.use(
  session({
    secret: "my secrete",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ALL ROUTES
app.use("/api", pdfRouter);
app.use("/auth", indexRouter);
app.use("/v1", onBoardRout);


// server details
const port = 5000;
app.listen(port, () => console.log(`Server is running ${port}...👍️`));

export default app;
