import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {connectDB} from "./database/db.js";
import router from "./routes/route.js";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import sessions from "express-session";
//import session from "client-sessions";
import passport from "passport";
import "./passport.js";
//initializing express app
const app = express();
//cookie session 1 day limit
// app.use(cookieSession({name: "pd", keys: ["one"], maxAge: 24 * 60 * 60 * 100}));
app.use(cookieParser());
// app.use(
//   session({
//     cookie: {ephemeral: true, secure: true, secureProxy: true},
//     cookieName: "session",
//     secret: "keyboardcat",
//   })
// );
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {maxAge: oneDay, secure: true},
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//using passport for google authentication

app.use(
  cors({
    //origin: "http://localhost:3000",
    origin:
      process.env.ENVIRONMENT === "Development"
        ? "http://localhost:3000"
        : "https://blogify-mern-client.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
//express dont know how to handle post request , so we use this
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", router);

dotenv.config({path: "./local.env"});
//port
const PORT = 8000;

//starting server
app.listen(PORT, () => {
  console.log("server running");
});

//connecting to database
connectDB();
