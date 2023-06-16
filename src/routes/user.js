const express = require("express");
const userRoute = express.Router();
const { createUser, userLogin } = require("../controllers/userController");

//route to sign up a new user
userRoute.post("/signup", createUser);

//route to login a user
userRoute.post("/login", userLogin);

module.exports = userRoute;
