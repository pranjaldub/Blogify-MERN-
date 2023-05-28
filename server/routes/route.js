// here we specify the enpoints of API urls

import express from "express";
import {signupUser, loginUser} from "../controller/user-comtroller.js";

const router = express.Router();

router.post("/signup", signupUser).post("/login", loginUser);

export default router;
