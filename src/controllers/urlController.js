//import required modules
const {
  shortenOriginalUrl,
  getAllUserUrls,
  editUserUrl,
  searchUserUrl,
} = require("../dao/url.dao");
const { redirectUserUrl } = require("../services/urlServices");

//@desc Shorten Original Url
//@route POST /api/url/shorten
//@access private

const shortenUrl = async (req, res) => {
  try {
    let result = await shortenOriginalUrl(req);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error shortening url: ", error);
    res.status(404).json(error.message);
  }
};

//@desc Get all Urls created by a User
//@route GET /api/url/all
//@access private

const getUrls = async (req, res) => {
  try {
    let result = await getAllUserUrls(req);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error fetching urls: ", error);
    res.status(404).json(error.message);
  }
};

//@desc Edit shortened Url created by a User
//@route PUT /api/url/edit/:id
//@access private

const editUrl = async (req, res) => {
  try {
    let result = await editUserUrl(req);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error editing url: ", error);
    res.status(404).json(error.message);
  }
};

//@desc Search shortened Url created by a User
//@route GET /api/url/search
//@access private

const searchUrl = async (req, res) => {
  try {
    let result = await searchUserUrl(req);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error fetching url: ", error);
    res.status(404).json(error.message);
  }
};

//@desc Redirect Shortenel Url to Original Url Address
//@route GET /api/url/:shortenedUrl
//@access private

const redirectUrl = async (req, res) => {
  try {
    let result = await redirectUserUrl(req);
    res.status(200).redirect(result);
  } catch (error) {
    console.log("Error redirecting url: ", error);
    res.status(404).json(error.message);
  }
};

module.exports = { shortenUrl, getUrls, editUrl, searchUrl, redirectUrl };
