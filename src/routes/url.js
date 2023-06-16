const express = require("express");
const urlRoute = express.Router();
const {
  shortenUrl,
  getUrls,
  editUrl,
  searchUrl,
  redirectUrl,
} = require("../controllers/urlController");
const { authToken } = require("../middlewares/auth");

//route to shorten url
urlRoute.post("/shorten", authToken, shortenUrl);

//route to get all urls created by user
urlRoute.get("/all", authToken, getUrls);

//route to edit shortened url
urlRoute.put("/edit/:id", authToken, editUrl);

//route to search shortened url
urlRoute.get("/search", authToken, searchUrl);

//route to redirect shortened url
urlRoute.get("/gt/:shortenedUrl", authToken, redirectUrl);

module.exports = urlRoute;
