//import required modules
const Url = require("../models/urlModel");
const { generateShortenedUrl } = require("../services/urlServices");
const { requiredKeys } = require("../utils/requiredKeys");
const { getUserId } = require("../services/userServices");

//generate custom Url for user
const shortenOriginalUrl = async (req) => {
  try {
    //obtain original url
    const { originalUrl } = req.body;

    //validate user input
    const keys = ["originalUrl"];
    requiredKeys(req, keys);

    //generate shortened url and obtain userId
    const shortenedUrl = generateShortenedUrl();
    const userId = await getUserId(req);

    //check if shortened url already exist
    const foundUrl = await Url.findOne({ shortenedUrl });
    if (foundUrl) {
      throw new Error("Url already in use");
    } else {
      //create data in database
      const url = await Url.create({
        originalUrl,
        shortenedUrl,
        userId,
      });
      console.log(`data created ${url}`);
      return url;
    }
  } catch (error) {
    throw error;
  }
};

//get all url's generated by user
const getAllUserUrls = async (req) => {
  try {
    //obtain user id
    const userId = await getUserId(req);

    //return all urls generated by user and empty row if nothing has been genrated
    const url = await Url.find({ userId });
    return url;
  } catch (error) {
    throw error;
  }
};

//edit a shortened url created by a user
const editUserUrl = async (req) => {
  try {
    let { shortenedUrl } = req.body;
    shortenedUrl = shortenedUrl.trim();

    //obtain url id as a param and check if data exist
    const { id } = req.params;
    const foundId = await Url.findById(id);
    if (!foundId) {
      throw new Error("Data doesn't exist");
    }

    //define a regex pattern to restrict type of edit
    const textPattern = /^gt\//;
    if (!textPattern.test(shortenedUrl)) {
      throw new Error("You can't omit gt/");
    }

    //check if edited url already exist
    const foundUrl = await Url.findOne({ shortenedUrl });
    if (foundUrl) {
      throw new Error("Url already in use");
    }

    //obtain user Id and update edited url
    const userId = await getUserId(req);
    const updateUrl = await Url.findOneAndUpdate(
      { userId, _id: id },
      { $set: { shortenedUrl } },
      { returnOriginal: false }
    );

    if (!updateUrl) {
      throw new Error("Data doesn't belong to user");
    } else {
      return updateUrl;
    }
  } catch (error) {
    throw error;
  }
};

//search url created by user
const searchUserUrl = async (req) => {
  try {
    //define search text
    let { searchText } = req.body;
    searchText = searchText.trim();

    //obtain user Id
    const userId = await getUserId(req);

    //search database for results
    const foundText = await Url.find({
      userId: userId,
      shortenedUrl: { $regex: searchText, $options: "i" },
    });
    console.log(foundText);
    if (foundText.length === 0) {
      throw new Error("No results Found");
    } else {
      return foundText;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  shortenOriginalUrl,
  getAllUserUrls,
  editUserUrl,
  searchUserUrl,
};