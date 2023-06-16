//import usermodel, jsonwebtoken and dotenv configuration
const User = require("../models/userModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { requiredKeys } = require("../utils/requiredKeys");

//load dotenv config
dotenv.config();

//Check for duplicte email address
const checkDuplicateEmail = async (req) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase().trim();

    //check database to see if email is already in use
    const emailAvailable = await User.findOne({ email });
    if (emailAvailable) {
      throw new Error("Email address already in use");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

//Validate user input
const validateUserSignUp = async (req) => {
  try {
    const { name, email, password } = req.body;
    const emailPattern = /^\S+@\S+\.\S+$/;

    //validate keys provided by client
    const keys = ["name", "email", "password"];
    requiredKeys(req, keys);

    //run validations on fields passed to avoid redundant data
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    } else if (!emailPattern.test(email.trim())) {
      throw new Error("Email address provided is not valid");
    } else if (password.trim() === "") {
      throw new Error("Password field can not be empty");
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
};

//obtain user id
const getUserId = async (req) => {
  try {
    const jwtToken = req.headers.authorization || req.headers.Authorization;
    const decodedToken = jwt.decode(jwtToken);

    //obtain user_id from token payload
    const userId = decodedToken.user.user.id.toString();
    return userId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkDuplicateEmail,
  validateUserSignUp,
  getUserId,
};
