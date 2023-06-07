//Here we create the api to be used in route file endpoints

import User from "../model/User.js";
import Blogs from "../model/Blogs.js";
import UserActivity from "../model/UserActivity.js";
import Token from "../model/Token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";

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
      await UserActivity.create({
        username: req.body.username,
        createdBlogs: [],
        likedBlogs: [],
        savedBlogs: [],
      });
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

export const createBlogs = async (req, res) => {
  try {
    const blog = req.body; //req = {username:"..." , blog:"..."}
    console.log("blog", blog);
    const foundUser = await Blogs.findOne({name: blog.username});
    //user already exists
    if (foundUser) {
      //update existing field
      //foundUser.blogs.push({id: uuidv4(), blog: blog.blog});
      await Blogs.updateOne(
        {name: blog.username},
        {
          $set: {
            blogs: [
              ...foundUser.blogs,
              {
                id: uuidv4(),
                blog: blog.blog,
              },
            ],
          },
        }
      );
      return res.status(200).json({msg: "Blog submitted"});
    } else {
      const blogObject = {
        name: blog.username,
        blogs: [
          {
            id: uuidv4(),
            blog: blog.blog,
          },
        ],
      };

      console.log(blogObject);

      await Blogs.create(blogObject);
      return res.status(200).json({msg: "Blog submitted"});
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "blog not submitted"});
  }
};

export const getBlogs = async (req, res) => {
  try {
    // const blog = req.body; //req = {username:"..." , blog:"..."}

    // const foundUser = await Blogs.findOne({username: blog.username});
    // //user already exists
    // if (foundUser) {
    //   //update existing field
    //   foundUser.blogs.push({id: uuidv4(), blog: blog.blog});
    // } else {
    //   const blogObject = {
    //     name: blog.username,
    //     blogs: [{id: uuidv4(), blog: blog.blog}],
    //   };

    //   console.log(blogObject);

    //   await Blogs.create(blogObject);
    try {
      const username = req.params.username;
      const data = await Blogs.find({});
      const userData = await UserActivity.find({username: username});
      console.log(userData);
      res.status(200).send({
        msg: "fetching successful",
        data: data,
        userData: userData[0],
      });
    } catch (err) {
      return res.status(500).json({msg: "blog not submitted"});
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "blog not submitted"});
  }
};

export const getBlogsLogout = async (req, res) => {
  try {
    // const blog = req.body; //req = {username:"..." , blog:"..."}

    // const foundUser = await Blogs.findOne({username: blog.username});
    // //user already exists
    // if (foundUser) {
    //   //update existing field
    //   foundUser.blogs.push({id: uuidv4(), blog: blog.blog});
    // } else {
    //   const blogObject = {
    //     name: blog.username,
    //     blogs: [{id: uuidv4(), blog: blog.blog}],
    //   };

    //   console.log(blogObject);

    //   await Blogs.create(blogObject);
    try {
      //const username = req.params.username;
      const data = await Blogs.find({});
      //const userData = await UserActivity.find({username: username});
      //console.log(userData);
      res.status(200).send({
        msg: "fetching successful",
        data: data,
        //userData: userData[0],
      });
    } catch (err) {
      return res.status(500).json({msg: "blog not submitted"});
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "blog not submitted"});
  }
};

export const getBlogsById = async (req, res) => {
  try {
    const blogId = req.params.id; //localhost:8000/blogs/1a

    try {
      const data = await Blogs.find({blogs: {$elemMatch: {id: blogId}}});
      var arr = [];
      data.map((user) => {
        arr.push(...user.blogs.filter((blog) => blog.id === blogId));
      });
      res.status(200).send({msg: "blog fetched successfully", data: arr});
    } catch (err) {
      console.log(err);
      return res.status(500).json({msg: "blog not found"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "blog not found"});
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = req.body; //req = {username:"..."  , blog:{id:"" , ...}}
    //console.log("blog", blog.blog.category);

    // {"username":"Michael" , "blog":{ "id":"3a" , "heading": "The Benefits of Exercise",
    //     "description": "Discover the advantages of regular exercise.",
    //     "content": "<h2  a healthier and happier life.</p>",
    //     "category": "life",
    //     "author": "Michael"}}
    const user = await Blogs.find({name: blog.username});
    let userBlogs = user[0].blogs;

    userBlogs.find((item) => item.id == blog.blog.id).blog = blog.blog;

    await Blogs.updateOne(
      {name: blog.username},
      {
        $set: {
          blogs: userBlogs,
        },
      }
    );
    const u = await Blogs.find({blogs: {$elemMatch: {id: blog.blog.id}}});
    var arr = [];
    u.map((item) => {
      arr.push(
        ...item.blogs.filter((userBlog) => userBlog.id === blog.blog.id)
      );
    });
    return res.status(200).json({msg: "Blog updated", data: arr[0]});
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "blog not updated"});
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = req.body; //req = {username:"..." , blogId:"..."}
    //console.log("blog", blog);
    const foundUser = await UserActivity.findOne({username: blog.username});
    //user already exists

    //update existing field
    //foundUser.blogs.push({id: uuidv4(), blog: blog.blog});
    await UserActivity.updateOne(
      {username: blog.username},
      {
        $set: {
          likedBlogs: [...foundUser.likedBlogs, blog.blogId],
        },
      }
    );
    const found = await UserActivity.findOne({username: blog.username});
    return res.status(200).json({msg: "Blog liked", data: found});
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "blog not liked"});
  }
};

export const saveBlog = async (req, res) => {
  try {
    const blog = req.body; //req = {username:"..." , blogId:"..."}
    //console.log("blog", blog);
    const foundUser = await UserActivity.findOne({username: blog.username});
    //user already exists

    //update existing field
    //foundUser.blogs.push({id: uuidv4(), blog: blog.blog});
    await UserActivity.updateOne(
      {username: blog.username},
      {
        $set: {
          savedBlogs: [...foundUser.savedBlogs, blog.blogId],
        },
      }
    );
    const found = await UserActivity.findOne({username: blog.username});
    return res.status(200).json({msg: "Blog saved", data: found});
  } catch (error) {
    //console.log(error);
    return res.status(500).json({msg: "blog not saved"});
  }
};
