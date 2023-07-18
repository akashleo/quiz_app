import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    email: {
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
    role: {
      type: String,
      required: true
    },
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
