//import required modules
const Url = require("../models/urlModel");
const { getUserId } = require("../services/userServices");

//Function to generate custom url
const generateShortenedUrl = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 7;

  let shortenedUrl = "gt/";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortenedUrl += characters.charAt(randomIndex);
  }

  return shortenedUrl;
};

//Function to redirect shortened url to original url
const redirectUserUrl = async (req) => {
  try {
    //get shortenedurl and obtain userid from token
    let { shortenedUrl } = req.params;
    shortenedUrl = "gt/" + shortenedUrl;
    console.log(shortenedUrl);
    const userId = await getUserId(req);

    //search database to see if url exist and belongs to user
    const foundUrl = await Url.findOne({ shortenedUrl, userId });
    if (!foundUrl) {
      throw new Error("Url doesn't exist");
    }
    return foundUrl.originalUrl;
  } catch (error) {
    throw error;
  }
};
module.exports = { generateShortenedUrl, redirectUserUrl };
