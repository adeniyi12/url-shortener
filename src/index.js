//import required modules

const express = require("express");
const cors = require("cors");
const connectDb = require("./database/dbConfig");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");

//load dotenv
dotenv.config();

//connect to port
const port = process.env.PORT || process.env.port;

//load Database
connectDb();

//load application
const app = express();

//configure body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configure cross origin
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

//route configuration
app.get("/", (req, res) => {
  res.send("Ok");
});

app.use("/api/users", userRoute); //user route configuration
app.use("/api/url", urlRoute); //url route configuration

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
