import mongoose from "mongoose";

const Schema = mongoose.Schema;

//  username, password, fullName, level, quizPassed, fastestTime, correctAnswers, achievements, featuredCategory, image

const ProfileSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
    },
    quizPassed: {
      type: String,
    },
    fastestTime: {
      type: String,
    },

    achievements: [String],
    correctAnswers: {
      type: Number,
    },
    featuredCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    available: {
      type: Boolean,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
//module.exports = mongoose.model("Profile", profileSchema);
