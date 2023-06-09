import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {connectDB} from "./database/db.js";
import router from "./routes/route.js";
//initializing express app
const app = express();

app.use(cors());
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
