const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    tweetId: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Tweets || mongoose.model("Tweets", TweetSchema);
