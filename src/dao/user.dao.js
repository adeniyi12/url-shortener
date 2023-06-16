//import required modules
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { requiredKeys } = require("../utils/requiredKeys");
const {
  checkDuplicateEmail,
  validateUserSignUp,
} = require("../services/userServices");

//load dotenv
dotenv.config();

//Sign Up a new User
const userSignUp = async (req) => {
  try {
    const { name, email, password } = req.body;

    //validations
    await validateUserSignUp(req);
    await checkDuplicateEmail(req);

    //encrypt user password
    const hashedPassword = bcrypt.hashSync(
      password + process.env.BCRYPT_PASSWORD,
      parseInt(process.env.SALT_ROUNDS)
    );

    //create user profile in Database
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });
    console.log(`User created ${user}`);
    return user;
  } catch (error) {
    throw error;
  }
};

//authenticate user login
const authUserLogin = async (req) => {
  try {
    let { email, password } = req.body;
    email = email.trim();

    //validate user input field
    const keys = ["email", "password"];
    requiredKeys[(req, keys)];

    //check if user email exist and validate password
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      if (
        bcrypt.compareSync(
          password + process.env.BCRYPT_PASSWORD,
          foundUser.password
        )
      ) {
        return { user: { id: foundUser.id } };
      } else {
        throw new Error("Email and/or password do not match");
      }
    } else {
      throw new Error("Email and/or password do not match");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { userSignUp, authUserLogin };
