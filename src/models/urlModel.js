const mongoose = require("mongoose");

//create url Schema (url Table)
const urlSchema = mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortenedUrl: {
      type: String,
      required: true,
      unique: true,
      index: "text",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

urlSchema.index({ shortenedUrl: "text" });

module.exports = mongoose.model("Url", urlSchema);
