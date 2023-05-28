//Here we create the api to be used in route file endpoints

import User from "../model/User.js";
import Token from "../model/Token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({path: "../local.env"});
export const signupUser = async (req, res) => {
  try {
    //const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };

    //const newUser = new User(user);

    //await newUser.save();
    console.log(user);
    try {
      // if (User.findById(user.username)) {
      //   return res.status(500).json({msg: "username alraedy exists"});
      // }
      await User.create(user);
      return res.status(201).json({msg: "signup successful"});
    } catch (err) {
      if ({...err}.code === 11000) {
        //console.log("returning this");
        return res.status(500).json({msg: "username alrady exists"});
      }
      return res.status(500).json({msg: "signup not successful"});
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "signup not successful"});
  }
};

export const loginUser = async (req, res) => {
  const user = req.body;

  //console.log(user);

  //verify users , send successful message
  const foundUser = await User.findOne({username: user.username});
  console.log("found", foundUser);
  if (!foundUser) {
    return res.status(400).json({msg: "user dont exist"});
  }
  try {
    let match = await bcrypt.compare(user.password, foundUser.password);

    if (match) {
      //if user exists and password match , then authenticate using JsonWebToken(JWT)

      const accessToken = jwt.sign(
        JSON.stringify(user),
        process.env.ACCESS_SECRET_KEY
      );
      const refreshToken = jwt.sign(
        JSON.stringify(user),
        process.env.REFRESH_SECRET_KEY
      );

      await Token.create({token: refreshToken.toString()});

      return res.status(200).json({
        msg: "successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: foundUser.name,
        username: user.username,
      });
    } else {
      return res.status(400).json({msg: "password do not match"});
    }
  } catch (error) {
    //any connectivity error
    return res
      .status(400)
      .json({msg: "login not successful , maybe connection problem"});
  }
};
