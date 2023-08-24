import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {connectDB} from "./database/db.js";
import router from "./routes/route.js";
import cookieSession from "cookie-session";
import passport from "passport";
import "./passport.js";
//initializing express app
const app = express();
//cookie session 1 day limit
app.use(cookieSession({name: "pd", keys: ["one"], maxAge: 24 * 60 * 60 * 100}));

//using passport for google authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    //origin: "http://localhost:3000",
    origin: "https://blogify-mern-client.vercel.app",
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
